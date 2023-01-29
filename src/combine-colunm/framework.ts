import { ChartConfig, ChartOptions, ShapeStyle, CustomInfo } from '../interfaces';
import { BaseChart, renderChart } from '../core/framework';

import '../utils/tools/intervalShape';
import _ from 'lodash';
import { handleInterval } from '../column/framework';

export interface IntervalConfig {
  styles?: ShapeStyle;
  customInfo?: CustomInfo;
  isBack?: boolean;
}

class CombineColumn extends BaseChart {
  render = (options: ChartOptions, config: ChartConfig = {}) => {
    const { id, legends } = options;
    if (!id) {
      return {};
    }
    const chart = renderChart(options, config);
    // 允许绘制点图 和 标志线
    const { point, annotation } = config;
    const { color = '', position = '', shape = 'circle', size = 1, adjust = [] } = point;
    const { line = {}, text = {} } = annotation;
    try {
      chart
        .point()
        .color(color)
        .position(position)
        .size(size)
        .shape(shape)
        .style(color, (val) => {
          const legend = (legends as any)?.[val];
          return {
            stroke: color,
            fill: legend?.pointColor || legend?.color,
          };
        })
        .adjust(adjust[0]);
      chart.annotation().line(line).text(text);
      handleInterval(chart, options, config, {
        styles: {
          maxColumnWidth: 200,
          minColumnWidth: 40,
        },
      });
      chart
        .point()
        .color(color)
        .position(position)
        .size(size)
        .shape(shape)
        .style(color, (val) => {
          const legend = (legends as any)?.[val];
          return {
            stroke: color,
            fill: legend?.pointColor || legend?.color,
          };
        })
        .adjust(adjust[0]);
      chart.interaction('element-active');
      chart.render();
      this.instance = chart;
    } catch (err) {}
    return { chart, update: this.update };
  };
}

export default CombineColumn;
