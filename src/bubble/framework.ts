import { Chart, View } from '@antv/g2';
import { Datum } from '@antv/g2/lib/interface';
import { fetchConfig, fetchTooltip, generateChart, handleLegendBehavior } from '../core/framework';
import { ChartConfig, ChartOptions, Legends, ChartType } from '../interfaces';
import { getShapeConfig } from '../utils/tools/configUtils';
import { getPointShapeState } from '../utils/tools/shapeState';
import { bindPointColor, bindPosition, bindShape, bindSize, bindState } from '../utils/frameworks/geometry';

export class Bubble {
  chart: Chart | undefined;
  constructor() {
    this.chart = undefined;
  }

  update = ({ chart }: { chart: Chart; views?: View[] }, data: Datum[], config: ChartConfig) => {
    chart.changeData(data);
    chart.render(true);
    chart.forceFit();
  };

  render = <BubbleConfig>(options: ChartOptions, config: BubbleConfig) => {
    const { id, legends = {} } = options;
    if (!id) {
      return {};
    }
    const bubbleCfg = getShapeConfig(config, ChartType.BUBBLE);
    const chart = generateChart(options, config);
    fetchConfig(chart, options, config);

    const point = chart.point();
    bindPosition(point, bubbleCfg.position);
    bindSize(point, bubbleCfg.size);
    bindPointColor(point, bubbleCfg.color, legends);
    bindShape(point, 'circle');
    bindState(point, getPointShapeState());

    fetchTooltip(chart, config);
    chart.interaction('element-highlight');
    chart.interaction('brush');
    chart.render();
    return { chart, update: this.update };
  };

  legend = <BubbleConfig>(charts: (Chart | View)[], legends: Legends, config: BubbleConfig) => {
    const bubble = getShapeConfig(config, ChartType.BUBBLE);
    if (bubble.color) {
      charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, bubble.color));
    }
  };
}
