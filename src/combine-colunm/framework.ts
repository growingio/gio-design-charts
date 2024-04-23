import { ChartConfig, ChartOptions, ShapeStyle, CustomInfo } from '../interfaces';
import { BaseChart, renderChart } from '../core/framework';

import '../utils/tools/intervalShape';
import _ from 'lodash';
import { handleInterval } from '../column/framework';
import { Chart, Element, View } from '@antv/g2';

export interface IntervalConfig {
  styles?: ShapeStyle;
  customInfo?: CustomInfo;
  isBack?: boolean;
}

class CombineColumn extends BaseChart {
  render = (options: ChartOptions, config: ChartConfig = {}) => {
    const { id, legendObject } = options;
    if (!id) {
      return {};
    }
    this.config = config;
    this.options = options;
    const chart = renderChart(options, config);
    // 允许绘制点图 和 标志线
    const { point, annotation } = config;
    const { color = '', position = '', shape = 'circle', size = 1, adjust = [] } = point;
    const { line = {}, text = {} } = annotation;

    const renderPoint = (pointView: View | Chart) => {
      pointView
        .point()
        .color(color)
        .position(position)
        .size(size)
        .shape(shape)
        .style(color, (val) => {
          const legend: any = legendObject?.getLegend(val);
          return {
            zIndex: 1000,
            fill: legend?.pointColor || legend?.color,
          };
        })
        .state({
          active: {
            style: (element: Element) => {
              const modelFill = element?.getModel?.()?.style?.fill;
              const modelColor = element?.getModel?.()?.color;
              return {
                lineWidth: 2,
                stroke: modelFill || modelColor || '#000',
                strokeOpacity: 0.5,
              };
            },
          },
        })
        .adjust(adjust[0]);
    };

    try {
      renderPoint(chart);

      chart.annotation().line(line).text(text);
      handleInterval(chart, options, config, {
        styles: {
          maxColumnWidth: 200,
          minColumnWidth: 40,
        },
      });
      renderPoint(chart);

      chart.interaction('element-active');
      chart.legend(false);
      chart.render();
      this.instance = chart;
    } catch (err) {}
    return { chart, update: this.update };
  };
}

export default CombineColumn;
