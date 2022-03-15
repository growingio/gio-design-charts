import { Chart, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legend, Legends, Shape, AdjustOtptionType } from '../interfaces';
import {
  fetchTooltip,
  fetchViewConfig,
  generateChart,
  handleLegendBehavior,
  renderChart,
  updateChart,
} from '../core/framework';
import { getShapeConfig } from '../utils/tools/configUtils';
import { LooseObject } from '@antv/g-base';
import { ChartType } from '..';
import { forEach } from 'lodash';
import { getAxisFields } from '../utils/frameworks/axis';
import { integerCeil } from '../utils/number';
import { getDefaultViewTheme } from '../utils/chart';
import { Datum } from '@antv/g2/lib/interface';

export class LineBase {
  options: ChartOptions | undefined = undefined;
  chart: Chart | undefined = undefined;
  views: View[] = [];
  finnalView: View | undefined = undefined;

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

  contrastViewQueue = (dataMapping: LooseObject, legends: Legends) => {
    return (contrastView: (data: LooseObject[]) => void, finalView: (data: LooseObject[]) => void) => {
      let leadData = undefined;
      forEach(dataMapping, (v, k) => {
        const legend: LooseObject = legends[k] || {};
        if (!legend.hide && legend.role !== 'lead') {
          contrastView?.(v);
        }
        if (legend.role === 'lead') {
          leadData = v;
        }
      });
      leadData && finalView?.(leadData);
    };
  };

  lineShape = (chart: Chart | View, options: ChartOptions, shapeConfig: Shape) => {
    const { legends } = options;
    const line = chart.line({
      theme: {
        strokeWidth: 2,
      },
    });

    if (shapeConfig.adjust) {
      line.adjust.call(line, shapeConfig.adjust as AdjustOtptionType);
    }
    line.position(shapeConfig.position);
    line.color(shapeConfig.color);
    line.style(shapeConfig.color, (label: string) => {
      const legend = legends?.[label] || ({} as Legend);
      const style = {} as LooseObject;
      if (legend.color) {
        style.stroke = legend.color;
      }
      if (legend.lineDash) {
        style.lineDash = legend.lineDash;
      }
      // default width of line is 2px
      style.lineWidth = 2;
      return style;
    });
    return line;
  };

  updateContrast = (charts: { chart: Chart }, data: Datum[], config: ChartConfig) => {
    const lineCfg = getShapeConfig(config, ChartType.LINE);
    const [xField, yField] = getAxisFields(lineCfg.position);
    const [maxValue, dataMapping] = this.getDataByColor(lineCfg.color, xField, yField, data);
    this.setMax(yField, maxValue, config);

    const legends = this.options?.legends || {};
    const viewCount = 0;
    this.contrastViewQueue(dataMapping, legends)(
      (updatedData) => {
        const view = this.views?.[viewCount];
        view?.changeData(updatedData);
        view?.render(true);
      },
      (updatedData: LooseObject[]) => {
        this.finnalView?.changeData(updatedData);
        this.finnalView?.render(true);
      }
    );

    this.chart?.render(true);
  };

  legend = <LineConfig>(charts: (Chart | View)[], legends: Legends, config: LineConfig) => {
    const lineConfig = getShapeConfig(config, 'line');
    if (lineConfig.color) {
      charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, lineConfig.color));
    }
  };
}

export class Line extends LineBase {
  render = (options: ChartOptions, config: ChartConfig = {}) => {
    const { id } = options;
    if (!id) {
      return {};
    }
    const chart = renderChart(options, config);
    try {
      const lineConfig = getShapeConfig(config, 'line');
      this.lineShape(chart, options, lineConfig);
      chart.render();
      // Sometimes, chart will render wrong axis labels, render again will be fine.
      chart.render(true);
    } catch (err) {}
    return { chart, update: updateChart };
  };
}

export class ContrastLine extends LineBase {
  render = (options: ChartOptions, config: ChartConfig = {}) => {
    const { id, data, legends = {} } = options;
    if (!id) {
      return {};
    }
    const chart = generateChart(options, config);
    this.options = options;
    try {
      const lineCfg = getShapeConfig(config, ChartType.LINE);
      const [xField, yField] = getAxisFields(lineCfg.position);
      const [maxValue, dataMapping] = this.getDataByColor(lineCfg.color, xField, yField, data as LooseObject[]);
      this.setMax(yField, maxValue, config);
      const views: View[] = [];

      const viewOptions = { theme: getDefaultViewTheme(config) };

      // render history view, the label should hide;
      const historyView = (updatedData: LooseObject[]) => {
        const view = this.contrastView(chart, { ...options, data: updatedData }, config, viewOptions);
        views.push(view);
      };
      // render current view, the label should show;
      const currentView = (updatedData: LooseObject[]) => {
        const view = this.contrastView(chart, { ...options, data: updatedData }, config);
        views.push(view);
        this.finnalView = view;
      };
      this.contrastViewQueue(dataMapping, legends)(historyView, currentView);

      fetchTooltip(chart, config);
      chart.legend(false);
      chart.render();
      // Sometimes, chart will render wrong axis labels, render again will be fine.
      chart.render(true);
      this.chart = chart;
      return { chart, views, update: this.updateContrast };
    } catch (err) {}
    return { chart, update: this.updateContrast };
  };
}
