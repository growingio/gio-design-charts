import { Chart, View } from '@antv/g2';
import { fetchConfig, fetchTooltip, generateChart, handleLegendBehavior } from '../core/framework';
import { ChartConfig, ChartOptions, Legend, Legends, ChartType, Shape } from '../interfaces';
import { getShapeConfig } from '../utils/tools/configUtils';
import { Datum, MappingDatum } from '@antv/g2/lib/interface';
import { getDefaultTheme } from '../utils/chart';



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

    const chart = generateChart(options, config);
    const boxView = chart.createView();
    fetchConfig(boxView, options, config);
    
    boxView.schema().position(boxCfg.position).shape('box').style(boxCfg.color, boxCfg.style || defaultStyles.box).adjust(boxCfg.adjust);
    boxView.point().position('x*avg').size(3).style(boxCfg.color, boxCfg.style || defaultStyles.point).adjust(boxCfg.adjust);
    boxView.interaction('active-region');

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
