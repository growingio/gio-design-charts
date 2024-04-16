import { isEmpty } from 'lodash';
import { ChartConfig, ChartOptions, ChartType } from '../interfaces';
import { BaseChart, fetchConfig, generateChart } from '../core/framework';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { formatPercent } from '../utils';

export class HotMap extends BaseChart {
  render = (options: ChartOptions, config: ChartConfig = {}) => {
    this.options = options;
    this.config = config;

    const { id, data } = options;
    if (!id || isEmpty(data)) {
      return {};
    }
    const shapeConfig = getShapeConfig(config, ChartType.HotMap);

    const { xField, yField, zField } = shapeConfig;

    const { source } = (data || {}) as any;

    if (!isEmpty(source) && source?.length >= 1) {
      config.legend = config.legend || {
        position: 'bottom-left',
        label: {
          formatter: (text: any) => `${formatPercent(text || 0)}`,
          style: {
            fill: '#313E75',
          },
        },
        rail: {
          size: 16,
          style: {
            fill: '#fff',
          },
        },
      };
    }

    this.instance = generateChart(options, config);
    fetchConfig(this.instance, options, config);

    this.instance.data(source);

    this.instance
      .polygon()
      .position(`${xField}*${yField}`)
      .color(zField, shapeConfig?.color || '#F2F3FF-#B5C7FF-#618DFF')
      .label(zField, {
        offset: -2,
        style: {
          fill: '#fff',
          fontSize: 14,
          // shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0)',
        },
        content:
          shapeConfig?.content ||
          ((val) => {
            return `${formatPercent(val?.[zField] || 0)}`;
          }),
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });

    this.instance.interaction('element-active');

    this.instance.render();
  };
}
