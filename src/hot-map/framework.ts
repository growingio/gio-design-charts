import { get, isEmpty } from 'lodash';
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
      .color(zField, shapeConfig?.color || '#D9E1FF-#8EABFF-#2770EF')
      .label(zField, {
        offset: -2,
        style: {
          fill: '#fff',
          fontSize: 14,
        },
        content:
          shapeConfig?.label?.content ||
          shapeConfig?.content ||
          ((val) => {
            return `${formatPercent(val?.[zField] || 0)}`;
          }),
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      })
      .state({
        active: {
          style: (style) => {
            const currentColor = get(style, 'shape.cfg.attrs.fill');
            return {
              lineWidth: 1,
              stroke: '#fff',
              shadowColor: `${currentColor}10`,
              shadowBlur: 5,
              cursor: 'pointer',
              fill: currentColor,
            };
          },
        },
      });

    this.instance.interaction('element-active');

    this.instance.render();
  };
}
