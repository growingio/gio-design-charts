import { Element, Event, View } from '@antv/g2';
import { ChartConfig, ChartOptions, ChartType } from '../interfaces';
import { handleInterval, intervalShape } from '../column/framework';
import { BaseChart, fetchTooltip, fetchViewConfig, generateChart } from '../core/framework';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { Datum } from '@antv/g2/lib/interface';
import { getAxisFields } from '../utils/frameworks/axis';
import { LooseObject } from '@antv/g-base';
import { cloneDeep } from 'lodash';
import { bindBarCoordination } from '../utils/frameworks/coordinate';
import { getbackgroundState } from '../utils/tools/shapeState';
import { DEFAULT_APPEND_PADDING, DEFAULT_FONT_COLOR, colors } from '../theme';
import { getDefaultViewTheme } from '../utils/chart';
import { getColorByGroupModel } from '../utils/tools/utils';

export class Bar extends BaseChart {
  render = (options: ChartOptions, config: ChartConfig) => {
    this.options = options;
    this.config = config;
    const { id, report, data } = options;
    if (!id) {
      return {};
    }
    this.instance = generateChart(options, config);
    try {
      const linkView = this.instance.createView({
        region: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      });

      fetchViewConfig(linkView, { ...options, data: data?.slice()?.reverse() }, config);
      handleInterval(linkView, options, config, {}, ChartType.BAR);
      linkView.coordinate().transpose();
      linkView.on('afterrender', (event: Event) => {
        const geometries = event.view.geometries[0];
        if (geometries && geometries.elements) {
          report?.({ scale: geometries.getXScale(), elements: geometries.elements });
        }
      });
      linkView.render();
      this.views.push(linkView);

      fetchTooltip(this.instance, config);
      this.instance.coordinate().transpose();
      this.instance.legend(false);
      this.instance.render();
    } catch (err) {
      // show error
    }
  };

  update = (data: Datum[]) => {
    const linkView = this.views?.[0];
    linkView?.changeData(data.slice().reverse());
    linkView?.render(true);
    this.instance?.render(true);
    this.instance?.forceFit();
  };
}

export class TimeBar extends Bar {
  leadView: View | undefined = undefined;
  backView: View | undefined = undefined;
  textView: View | undefined = undefined;

  xField = '';
  yField = '';

  readonly fetchBackData = (yField: string, data: LooseObject[]) => {
    const backData = cloneDeep(data);
    backData?.forEach((item: LooseObject) => {
      item[yField] = 1;
    });
    return backData;
  };

  readonly renderBackground = (view: View, yField: string, data: LooseObject[]) => {
    const backData = this.fetchBackData(yField, data);
    bindBarCoordination(view);
    fetchViewConfig(view, { ...this.options, data: backData }, this.config as ChartConfig);
    const interval = intervalShape(view, this.options as ChartOptions, this.config as ChartConfig, {
      customInfo: { chartType: ChartType.BAR, defaultStyles: { color: `${colors[0]}10` } },
    });
    interval.state(getbackgroundState());
    view.tooltip(false);
    view.render(true);
  };

  readonly renderSuffixText = (elements: Element[]) => {
    this.textView?.clear();
    setTimeout(() => {
      elements.forEach((element: Element) => {
        const dataItem = element.getData();
        if (dataItem.suffix) {
          const box = element.shape.getCanvasBBox();
          const model = element.getModel();
          const color = getColorByGroupModel(model);
          const top = box.minY - DEFAULT_APPEND_PADDING - 2;
          this.textView?.annotation?.()?.html({
            position: ['100%', '0%'],
            offsetX: 0,
            offsetY: 0,
            html: () => {
              return `<div style="margin-left: -100%; padding-right: 100%; position: absolute; top: ${top}px; right: 0;">
                <div style="border: 1px solid #EBEDF5; font-family: Lato, 'PingFang SC'; color: ${DEFAULT_FONT_COLOR}; border-radius: 2px;
                  white-space:nowrap;background-color: #fff;box-sizing: border-box; height: 20px; font-size: 12px;
                  display: flex; align-items: center; padding: 0 4px;">
                <div style="width: 4px; height: 16px; display: inline-block; background-color: ${color};  margin-right: 2px; border-radius: 2px;"></div>
                <span>${dataItem.suffix?.text}</span>
                </div>
            </div>`;
            },
          });
          this.textView?.render(true);
        }
      });
    }, 600);
  };

  update = (data: LooseObject[]) => {
    if (data) {
      const reverseData = data?.slice()?.reverse();
      this.leadView?.changeData(reverseData);
      this.leadView?.render(true);

      const backData = this.fetchBackData(this.yField, reverseData);
      this.renderBackground(this.backView as View, this.yField, backData);
    }
    this.instance?.render(true);
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    this.options = options;
    this.config = config;

    const { id, data } = options;
    if (!id) {
      return {};
    }
    const reverseData = data?.slice()?.reverse();
    this.instance = generateChart(options, config);

    const lineCfg = getShapeConfig(config, ChartType.BAR);

    const [xField, yField] = getAxisFields(lineCfg.position);
    const backView = this.instance.createView({
      theme: getDefaultViewTheme(config),
    });
    this.renderBackground(backView, yField, reverseData);

    // 添加padding-right：180，防止条形图的label被后面的text覆盖住
    const leadView = this.instance.createView({
      appendPadding: [0, 180, 0, 0],
    });
    bindBarCoordination(leadView);
    fetchViewConfig(leadView, { ...options, data: reverseData }, config);
    handleInterval(leadView, options, config, {}, ChartType.BAR);

    const textView = this.instance.createView();
    bindBarCoordination(textView);
    this.textView = textView;
    this.views.push(textView);

    leadView.on('afterrender', (e: Event) => {
      setTimeout(() => {
        if (e.view?.geometries?.[0]) {
          const elements = e.view.geometries[0]?.elements;
          this.renderSuffixText(elements);
        }
      }, 600);
    });

    this.xField = xField;
    this.yField = yField;

    this.leadView = leadView;
    this.views.push(leadView);

    this.backView = backView;
    this.views.push(backView);

    leadView.interaction('element-highlight-by-color');
    leadView.render();
    textView.render();
    fetchTooltip(this.instance, config);
    this.instance.render();
  };
}
