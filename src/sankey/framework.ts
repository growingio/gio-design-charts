import { BaseChart, fetchTooltip, generateChart } from '../core/framework';
import { ChartConfig, ChartOptions } from '../interfaces';

export class Sankey extends BaseChart {
  render = (options: ChartOptions, config: ChartConfig) => {
    console.log(config, options);
    const { id, data } = options;

    if (!id || !data) {
      /* istanbul ignore next */
      return {};
    }
    this.instance = generateChart(options, config);
    const { nodes, edges } = data as any;

    // node view
    const nodeView = this.instance.createView();
    nodeView.data(nodes as any);
    nodeView
      .polygon()
      .position('x*y') // nodes数据的x、y由layout方法计算得出
      .color('name')
      .label('x*name', (x, name) => {
        const isLast = x[1] === 1;
        return {
          style: {
            fill: '#545454',
            textAlign: isLast ? 'end' : 'start',
          },
          offsetX: isLast ? -8 : 8,
          content: name,
        };
      })
      .tooltip(false)
      .style('name', (name) => {
        if (name === '跳失') {
          return {
            fill: '#FF6010',
            stroke: '#FF6010',
          };
        }
        if (name === '首页 UV') {
          return {
            fill: '#5D7092',
            stroke: '#5D7092',
          };
        }
        return {};
      });

    this.views.push(nodeView);

    // edge view
    const edgeView = this.instance.createView();
    edgeView.data(edges);

    console.log(edges);
    edgeView
      .edge()
      .position('x*y')
      .shape('arc')
      .color('name')
      .tooltip('target*source*value', (target, source, value) => {
        return {
          name: source + ' to ' + target,
          value,
        };
      })
      .style('source*target', (source, target) => {
        if (source.includes('其他') || target.includes('其他')) {
          return {
            lineWidth: 0,
            opacity: 0.4,
            fill: '#CCC',
            stroke: '#CCC',
          };
        }

        if (target === '跳失') {
          return {
            lineWidth: 0,
            opacity: 0.4,
            fill: 'l(0) 0:#FFBB9E 0.2:#FFC8B4 1:#FFFCF2',
            stroke: 'l(0) 0:#FFBB9E 0.2:#FFC8B4 1:#FFFCF2',
          };
        }

        return {
          opacity: 0.2,
          lineWidth: 0,
        };
      })
      .state({
        active: {
          style: {
            opacity: 0.8,
            lineWidth: 0,
          },
        },
      });

    this.views.push(edgeView);

    fetchTooltip(this.instance, config);

    this.instance.interaction('element-active');
    this.instance.render();
  };
}
