import { Chart, Element, View } from '@antv/g2';
import { BaseChart, fetchConfig, fetchTooltip, generateChart } from '../core/framework';
import { ChartConfig, ChartOptions, ChartType } from '../interfaces';
import { Datum } from '@antv/g2/lib/interface';
import { getShapeConfig } from '../utils/tools/shapeConfig';

export class Box extends BaseChart {
  chart: Chart | undefined = undefined;
  boxView: View | undefined = undefined;
  options: ChartOptions | undefined = undefined;
  config: ChartConfig | undefined = undefined;

  update = (data: Datum[]) => {
    const [boxView] = this.views;
    if (Array.isArray(data)) {
      boxView?.changeData(data);
    }
    boxView?.render(true);
    this.instance?.forceFit();
    this.instance?.render(true);
    this.instance?.render(true);
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    const { id, defaultStyles = {}, data } = options;
    if (!id) {
      /* istanbul ignore next */
      return {};
    }

    const boxCfg = getShapeConfig(config, ChartType.BOX);
    const pointCfg = getShapeConfig(config, 'point');

    const chart = generateChart(options, config);
    const boxView = chart.createView();
    fetchConfig(boxView, options, config);
    boxView
      .schema({
        maxColumnWidth: config?.customSizeConfig?.maxColumnWidth || 60,
        minColumnWidth: config?.customSizeConfig?.minColumnWidth || 16,
        columnWidthRatio: 0.5,
      })
      .position(boxCfg.position)
      .color(boxCfg.color)
      .shape('box')
      .style(boxCfg.color, defaultStyles.box)
      .state({
        active: {
          style: (element: Element) => (element as any)?.statesStyle?.default,
        },
        inactive: {
          style: (element: Element) => ({ ...(element as any)?.statesStyle?.default, opacity: 0.2 }),
        },
      })
      .adjust(boxCfg.adjust);
    boxView
      .point()
      .position(pointCfg.position)
      .color(boxCfg.color)
      .size(pointCfg?.size || 3)
      .style(pointCfg.color, pointCfg.style || defaultStyles.point)
      .state({
        active: {
          style: (element: Element) => (element as any)?.statesStyle?.default,
        },
        inactive: {
          style: (element: Element) => ({ ...(element as any)?.statesStyle?.default, opacity: 0.2 }),
        },
      })
      .adjust(boxCfg.adjust);
    boxView.render();

    fetchTooltip(chart, config);
    boxView.interaction('active-region');
    // boxView.interaction('element-active');
    boxView.interaction('element-highlight-by-color');
    chart.render();

    this.chart = chart;
    this.instance = chart;
    this.boxView = boxView;
    this.options = options;
    this.config = config;
    this.views = [boxView];
    this.instance.legend(false);
    return { chart, views: [boxView], update: this.update };
  };

  // legend = <BoxConfig>(legends: Legends) => {
  //   const box = getShapeConfig(this.config as ChartConfig, 'box');
  //   if (box.color) {
  //     handleLegendBehavior(this.instance, legends, box.color);
  //     this.chart?.render(true);
  //   }
  // };
}
