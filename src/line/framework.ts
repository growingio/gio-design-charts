import { Chart, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legend, Legends, Shape, AdjustOtptionType } from '../interfaces';
import { BaseChart, fetchTooltip, fetchViewConfig, generateChart, renderChart } from '../core/framework';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { LooseObject } from '@antv/g-base';
import { ChartType } from '../index';
import { forEach, get } from 'lodash';
import { getAxisFields } from '../utils/frameworks/axis';
import { integerCeil } from '../utils/number';
import { getDefaultViewTheme } from '../utils/chart';
import { Datum } from '@antv/g2/lib/interface';

import '../utils/tools/shapes/lineSplitLine';

export class LineBase extends BaseChart {
  finalView: View | undefined = undefined;

  getDataByColor = (color: string, xField: string, yField: string, data: LooseObject[]): [number, LooseObject] => {
    const dataMapping: LooseObject = {};
    let maxValue = 0;
    data?.forEach((item) => {
      const viewData = dataMapping[item[color]] || [];
      item[xField] = String(item[xField]);
      viewData.push(item);
      dataMapping[item[color]] = viewData;
      maxValue = item[yField] > maxValue ? item[yField] : maxValue;
    });
    return [maxValue, dataMapping];
  };

  setMax = (yField: string, maxValue: number, config: ChartConfig) => {
    const scale = {
      ...config.scale,
      [yField]: {
        ...((config.scale as LooseObject)?.[yField] || {}),
        max: integerCeil(maxValue),
      },
    };
    config.scale = scale;
  };

  contrastView = (chart: Chart, options: ChartOptions, config: ChartConfig, viewOptions: LooseObject = {}) => {
    const lineCfg = getShapeConfig(config, ChartType.LINE);
    const view = chart.createView(viewOptions);
    fetchViewConfig(view, options, config);
    this.lineShape(view, options, lineCfg);
    view.render();
    return view;
  };

  getFirstRange = (current: number, max: number) => {
    const range = (max - current) / (max - 1) || 0;
    return range > 0 ? range : 0;
  };

  getSecondRange = (current: number, max: number) => 1 - this.getFirstRange(current, max);

  contrastViewQueue = (dataMapping: LooseObject, legends: Legends) => {
    return (
      contrastView: (data: LooseObject[], count: number) => void,
      finalView: (data: LooseObject[], count: number) => void
    ) => {
      let leadData = undefined;
      let maxCount = 0;
      const contrastData = [] as any[];
      forEach(dataMapping, (v, k) => {
        maxCount = v.length > maxCount ? v.length : maxCount;
        const legend: LooseObject = legends[k] || {};
        if (!legend.hide && legend.role !== 'lead') {
          contrastData.push(v);
        }
        if (legend.role === 'lead') {
          leadData = v;
        }
      });
      contrastData.forEach((item) => contrastView(item, maxCount));
      leadData && finalView?.(leadData, maxCount);
    };
  };

  lineShape = (chart: Chart | View, options: ChartOptions, shapeConfig: Shape) => {
    const { legendObject } = options;
    const line = chart.line({
      theme: {
        strokeWidth: 2,
      },
    });

    if (shapeConfig.adjust) {
      line.adjust.call(line, shapeConfig.adjust as AdjustOtptionType);
    }
    line.position(shapeConfig.position);
    if (shapeConfig?.shape) {
      line.shape('split-line');
    }
    if (shapeConfig.color) {
      line.color(shapeConfig.color);
      line.style(shapeConfig.color, (label: string) => {
        const legend = legendObject?.getLegend(label) || ({} as Legend);
        const style = {} as LooseObject;
        style.stroke = legend?.color || '#5F87FF';
        if (legend.lineDash) {
          style.lineDash = legend.lineDash;
        }
        // default width of line is 2px
        style.lineWidth = 2;
        return style;
      });
    }
    return line;
  };

  update = (data: Datum[]) => {
    const lineCfg = getShapeConfig(this.config, ChartType.LINE);
    const [xField, yField] = getAxisFields(lineCfg.position);
    const [maxValue, dataMapping] = this.getDataByColor(lineCfg.color, xField, yField, data);
    this.setMax(yField, maxValue, this.config as ChartConfig);

    const legends = this.options?.legends || {};
    const viewCount = 0;
    this.contrastViewQueue(dataMapping, legends)(
      (updatedData) => {
        const view = this.views?.[viewCount];
        view?.changeData(updatedData);
        view?.render(true);
      },
      /* istanbul ignore next */
      (updatedData: LooseObject[]) => {
        this.finalView?.changeData(updatedData);
        this.finalView?.render(true);
      }
    );
    this.instance?.render(true);
  };
}

export class Line extends LineBase {
  render = (options: ChartOptions, config: ChartConfig = {}) => {
    this.options = options;
    this.config = config;

    const { id } = options;
    if (!id) {
      return;
    }
    this.instance = renderChart(options, config);
    try {
      const lineConfig = getShapeConfig(config, 'line');
      this.lineShape(this.instance, options, lineConfig);
      this.instance.render();
      // Sometimes, chart will render wrong axis labels, render again will be fine.
      // this.instance.render(true);
    } catch (err) {
      /* istanbul ignore next */
      console.log(err);
    }
  };
}

export class ContrastLine extends LineBase {
  render = (options: ChartOptions, config: ChartConfig = {}) => {
    this.options = options;
    this.config = config;

    const { id, data, legendObject } = options;
    if (!id) {
      /* istanbul ignore next */
      return {};
    }
    this.instance = generateChart(options, config);
    this.options = options;
    try {
      const lineCfg = getShapeConfig(config, ChartType.LINE);
      const [xField, yField] = getAxisFields(lineCfg.position);
      const [maxValue, dataMapping] = this.getDataByColor(lineCfg.color, xField, yField, data as LooseObject[]);
      this.setMax(yField, maxValue, config);
      const views: View[] = [];

      const viewOptions = { theme: getDefaultViewTheme(config) };

      const rangeAlignLeft = get(config, `scale.${xField}.rangeAlignLeft`);

      // render history view, the label should hide;
      const historyView = (updatedData: LooseObject[]) => {
        const view = this.contrastView(this.instance as Chart, { ...options, data: updatedData }, config, viewOptions);
        views.push(view);
      };
      // render current view, the label should show;
      const currentView = (updatedData: LooseObject[]) => {
        const view = this.contrastView(this.instance as Chart, { ...options, data: updatedData }, config);
        views.push(view);
        this.finalView = view;
      };
      this.contrastViewQueue(dataMapping, legendObject?.mapping || {})(historyView, currentView);

      this.views = views;

      fetchTooltip(this.instance, config);
      this.instance.legend(false);
      this.instance.render();
      // Sometimes, chart will render wrong axis labels, render again will be fine.
      this.instance.render(true);
    } catch (err) {
      /* istanbul ignore next */
      console.log(err);
    }
  };
}
