import { Chart, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legends } from '../interface';
import { handleInterval } from './columnChart';
import { fetchChartConfig, fetchTooltip, generateChart, handleLegendBehavior } from './common';
import { getShapeConfig } from './utils';

export const barChart = (options: ChartOptions, config: ChartConfig) => {
  const { id } = options;
  if (!id) {
    return;
  }
  const { reporter } = options;
  const chart = generateChart(options, config);
  try {
    const linkView = chart.createView();

    linkView.on('afterrender', function (event: any) {
      const geometries = event?.view?.geometries?.[0];
      if (geometries && geometries?.elements) {
        reporter({ scale: geometries.getXScale(), elements: geometries?.elements });
      }
    });
    fetchChartConfig(linkView, options, config);
    handleInterval(linkView, options, config, 'bar');
    linkView.coordinate().transpose();
    linkView.render();

    fetchTooltip(chart, config);
    chart.coordinate({ type: 'cartesian' }).transpose().reflect('y');
    chart.legend(false);
    chart.render();
    return { chart, views: [linkView] };
  } catch (err) {
    return { chart };
  }
};

export const handleLegend = (charts: (Chart | View)[], legends: Legends, config: any) => {
  const barConfig = getShapeConfig(config, 'bar');
  if (barConfig.color) {
    charts.map((chart: Chart | View) => handleLegendBehavior(chart, legends, barConfig.color));
  }
};
