import { isEmpty } from 'lodash';
import { ChartConfig, ChartOptions, ChartType } from '../interfaces';
import { BaseChart, generateChart } from '../core/framework';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { formatNumber, formatPercent } from '../utils';

export class HotMap extends BaseChart {
  render = (options: ChartOptions, config: ChartConfig = {}) => {
    this.options = options;
    this.config = config;

    const { id, data } = options;
    if (!id || isEmpty(data)) {
      return {};
    }
    this.instance = generateChart(options, config);

    const shapeConfig = getShapeConfig(config, ChartType.HotMap);

    const { xField, yField, zField } = shapeConfig;

    const { source } = (data || {}) as any;

    this.instance.data(source);
    this.instance.scale(xField, {
      type: 'cat',
      values: (data as any)?.[xField] || [],
    });
    this.instance.scale(yField, {
      type: 'cat',
      values: (data as any)?.[yField] || [],
    });
    this.instance.scale('value', {
      nice: true,
    });
    this.instance.axis(xField, {
      tickLine: null,
      grid: {
        alignTick: false,
        line: {
          style: {
            lineWidth: 1,
            lineDash: null,
            stroke: '#f0f0f0',
          },
        },
      },
    });

    this.instance.axis(yField, {
      title: null,
      grid: {
        alignTick: false,
        line: {
          style: {
            lineWidth: 1,
            lineDash: null,
            stroke: '#f0f0f0',
          },
        },
      },
    });

    this.instance.tooltip(config.tooltip);

    this.instance
      .polygon()
      .position(`${xField}*${yField}`)
      .color(zField, '#F2F3FF-#8EABFF-#0052D9')
      .label(zField, {
        offset: -2,

        style: {
          fill: '#fff',
          fontSize: 14,
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
        content: (val) => {
          return `${formatPercent(val?.[zField] || 0)}`;
        },
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });

    this.instance.interaction('element-active');

    this.instance.render();
  };
}
