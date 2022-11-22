import { Chart, View } from '@antv/g2';
import { fetchConfig, fetchTooltip, generateChart, handleLegendBehavior } from '../core/framework';
import { ChartConfig, ChartOptions, Legends, ChartType } from '../interfaces';
import { getShapeConfig } from '../utils/tools/configUtils';
import { Datum } from '@antv/g2/lib/interface';

export class Box {
  chart: Chart | undefined = undefined;
  boxView: View | undefined = undefined;
  options: ChartOptions | undefined = undefined;
  config: ChartConfig | undefined = undefined;

  update = ({ chart, views = [] }: { chart: Chart; views?: View[] }, data: Datum[], config: ChartConfig) => {
    const [boxView] = views;
    if (Array.isArray(data)) {
      boxView?.changeData(data);
    }
    boxView?.render(true);
    chart.forceFit();
    chart.render(true);
    chart.render(true);
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    const { id, legends = {}, defaultStyles = {}, data } = options;
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
        maxColumnWidth: 60,
        minColumnWidth: 16,
        columnWidthRatio: 0.5
      })
      .position(boxCfg.position)
      .shape('box')
      .style(boxCfg.color, boxCfg.style || defaultStyles.box)
      .adjust(boxCfg.adjust);
    boxView
      .point()
      .position(pointCfg.position)
      .size(pointCfg?.size || 3)
      .style(pointCfg.color, pointCfg.style || defaultStyles.point)
      .adjust(boxCfg.adjust);
    boxView.interaction('active-region');
    boxView.interaction('element-highlight-by-color');

    fetchTooltip(chart, config);
    chart.render();

    chart.render(true);

    this.chart = chart;
    this.boxView = boxView;
    this.options = options;
    this.config = config;
    return { chart, views: [boxView], update: this.update };
  };

  legend = <BoxConfig>(charts: (Chart | View)[], legends: Legends, config: BoxConfig) => {
    const box = getShapeConfig(config as ChartConfig, 'box');
    if (box.color) {
      charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, box.color));
      this.chart?.render(true);
    }
  };
}
