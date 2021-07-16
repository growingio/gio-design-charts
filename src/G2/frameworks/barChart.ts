import { Chart } from '@antv/g2';
import { Tooltip } from 'bizcharts';
import { ILegend, ILegends } from '../interface';

export const barChart = (
  id: HTMLElement | null,
  data: any,
  legends: ILegends
) => {
  const chart = new Chart({
    container: id as HTMLElement,
    autoFit: true,
    height: 200,
  });
  chart.data(data);
  chart.scale('value', { nice: true });
  chart.tooltip({
    // showCrosshairs: true,
    // shared: true
    enterable: true,
    showContent: true,
    follow: false,
  });

  chart.interaction('element-highlight-by-x');

  chart
    .interval()
    .position('type*value')
    .color('company')
    .adjust([
      {
        type: 'dodge',
        marginRatio: 0,
      },
    ])
    .color('company')
    .style('company', (label: string) => {
      const legend = legends[label] || {};
      // return { fill: 'linear-gradient(135deg, #000 20px, #0092b7 40px)'}
      if (label === 'Apple') {
        return {
          fill: legend.color,
          //   fillStyle: 'p(a)http://localhost:6006/333.png',
        };
      }
      return { fill: legend.color };
    });
  chart.render();

  return chart;
};

export const handleLegend = (chart: Chart, legends: ILegends) => {
  chart.filter('company', (value: string) => {
    return (legends[value] || {}).active;
  });
  chart.render(true);
};
