import { Chart } from '@antv/g2';
import { ILegend, ILegends } from '../interface';

export const lineChart = (
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
  chart.scale({
    month: {
      range: [0, 1],
    },
    temperature: {
      nice: true,
    },
  });

  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  });

  chart.axis('temperature', {
    label: {
      formatter: (val) => {
        return val + ' °C';
      },
    },
  });

  chart
    .line()
    .position('month*temperature')
    .color('city')
    .shape('smooth')
    .style('city', (label: string) => {
      const legend = legends[label] || {};
      const style = { stroke: legend.color } as any;
      if (legend.lineDash) {
        style.lineDash = legend.lineDash;
      }
      return style;
    });

  chart
    .point()
    .position('month*temperature')
    .color('city')
    .shape('circle')
    .style('city', (label: string) => {
      const legend = legends[label] || {};
      const style = { stroke: '#fff', fill: legend.color } as any;
      return style;
    });
  chart.legend(false);

  chart.render();
  return chart;
};

export const handleLegend = (chart: Chart, legends: ILegends) => {
  chart.filter('city', (value: string) => {
    return (legends[value] || {}).active;
  });
  chart.render(true);
};
