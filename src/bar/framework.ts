import { Chart, Element, Event, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legends, ChartType } from '../interfaces';
import { handleInterval, intervalShape } from '../column/framework';
import { fetchTooltip, fetchViewConfig, generateChart, handleLegendBehavior } from '../core/framework';
import { getShapeConfig } from '../utils/tools/configUtils';
import { Datum } from '@antv/g2/lib/interface';
import { getAxisFields } from '../utils/frameworks/geometry';
import { LooseObject } from '@antv/g-base';
import { cloneDeep } from 'lodash';
import { bindBarCoordination } from '../utils/frameworks/coordinate';
import { getbackgroundState } from '../utils/tools/shapeState';
import { DEFAULT_APPEND_PADDING, DEFAULT_FONT_COLOR, colors } from '../theme';
import { getDefaultViewTheme } from '../utils/chart';
import { getColorByModel } from '../utils/tools/utils';

export const updateChart = ({ chart, views = [] }: { chart: Chart; views?: View[] }, data: Datum[]) => {
  const linkView = views?.[0];
  linkView?.changeData(data.reverse());
  linkView?.render(true);

  chart.render(true);
  chart.forceFit();
};

export const barChart = (options: ChartOptions, config: ChartConfig) => {
  const { id, report, data } = options;
  if (!id) {
    return {};
  }
  const chart = generateChart(options, config);
  try {
    const linkView = chart.createView({
      region: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
    });

    fetchViewConfig(linkView, { ...options, data: data?.reverse() }, config);
    handleInterval(linkView, options, config, {}, ChartType.BAR);
    linkView.coordinate().transpose();
    linkView.on('afterrender', function (event: Event) {
      const geometries = event.view.geometries[0];
      if (geometries && geometries.elements) {
        report?.({ scale: geometries.getXScale(), elements: geometries.elements });
      }
    });
    linkView.render();

    fetchTooltip(chart, config);
    chart.coordinate().transpose();
    chart.legend(false);
    chart.render();
    return { chart, views: [linkView], update: updateChart };
  } catch (err) {
    // show error
  }
  return { chart, update: updateChart };
};

export const handleLegend = <BarConfig>(charts: (Chart | View)[], legends: Legends, config: BarConfig) => {
  const barConfig = getShapeConfig(config, ChartType.BAR);
  if (barConfig.color) {
    charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, barConfig.color));
  }
};

export class Bar {
  options: ChartOptions | undefined = undefined;
  config: ChartConfig | undefined = undefined;
  chart: Chart | undefined = undefined;
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
          const color = getColorByModel(model);
          const top = box.minY - DEFAULT_APPEND_PADDING - 1;
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

  updateTimeInterval = (charts: { chart: Chart }, data: LooseObject[]) => {
    if (data) {
      const reverseData = data?.reverse();
      this.leadView?.changeData(reverseData);
      this.leadView?.render(true);

      const backData = this.fetchBackData(this.yField, reverseData);
      this.renderBackground(this.backView as View, this.yField, backData);
    }
    this.chart?.render(true);
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    const { id, data } = options;
    if (!id) {
      return {};
    }
    const reverseData = data?.reverse();
    this.options = options;
    this.config = config;
    const chart = generateChart(options, config);

    const lineCfg = getShapeConfig(config, ChartType.BAR);

    const [xField, yField] = getAxisFields(lineCfg.position);
    const backView = chart.createView({
      theme: getDefaultViewTheme(config),
    });
    this.renderBackground(backView, yField, reverseData);

    // 添加padding-right：180，防止条形图的label被后面的text覆盖住
    const leadView = chart.createView({
      appendPadding: [0, 180, 0, 0],
    });
    bindBarCoordination(leadView);
    fetchViewConfig(leadView, { ...options, data: reverseData }, config);
    handleInterval(leadView, options, config, {}, ChartType.BAR);

    const textView = chart.createView();
    bindBarCoordination(textView);
    this.textView = textView;

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
    this.backView = backView;
    this.chart = chart;
    leadView.interaction('element-highlight-by-color');
    leadView.render();
    textView.render();
    fetchTooltip(chart, config);
    chart.render();
    return { chart, views: [leadView, backView, textView], update: this.updateTimeInterval };
  };
}
