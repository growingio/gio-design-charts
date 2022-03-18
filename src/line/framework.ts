import { Chart, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legend, Legends, Shape, AdjustOtptionType } from '../interfaces';
import { BaseChart, fetchTooltip, fetchViewConfig, generateChart, renderChart } from '../core/framework';
import { getShapeConfig } from '../utils/tools/configUtils';
import { LooseObject } from '@antv/g-base';
import { ChartType } from '..';
import { forEach } from 'lodash';
import { getAxisFields } from '../utils/frameworks/axis';
import { integerCeil } from '../utils/number';
import { getDefaultViewTheme } from '../utils/chart';
import { Datum } from '@antv/g2/lib/interface';

export class LineBase extends BaseChart {
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
    line.color(shapeConfig.color);
    line.style(shapeConfig.color, (label: string) => {
      const legend = legendObject?.getLegend(label) || ({} as Legend);
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
      (updatedData: LooseObject[]) => {
        this.finnalView?.changeData(updatedData);
        this.finnalView?.render(true);
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
      this.instance.render(true);
    } catch (err) {
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

      // render history view, the label should hide;
      const historyView = (updatedData: LooseObject[]) => {
        const view = this.contrastView(this.instance as Chart, { ...options, data: updatedData }, config, viewOptions);
        views.push(view);
      };
      // render current view, the label should show;
      const currentView = (updatedData: LooseObject[]) => {
        const view = this.contrastView(this.instance as Chart, { ...options, data: updatedData }, config);
        views.push(view);
        this.finnalView = view;
      };
      this.contrastViewQueue(dataMapping, legendObject?.mapping || {})(historyView, currentView);

      this.views = views;

      fetchTooltip(this.instance, config);
      this.instance.legend(false);
      this.instance.render();
      // Sometimes, chart will render wrong axis labels, render again will be fine.
      this.instance.render(true);
      return { chart: this.instance, views, update: this.update };
    } catch (err) {}
    return { chart: this.instance, update: this.update };
  };
}
