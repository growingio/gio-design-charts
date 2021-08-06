import { Chart, View } from '@antv/g2';
import { IChartConfig, IChartOptions, ILegends } from '../interface';
import { handleInterval } from './columnChart';
import { fetchChartConfig, generateChart, handleLegendBehavior } from './common';
import { getShapeConfig } from './utils';

export const barChart = (options: IChartOptions, config: IChartConfig) => {
  const { reporter } = options;
  const chart = generateChart(options, config);
  const linkView = chart.createView();

  linkView.on('afterrender', function (event: any) {
    console.log('============cccc after render');
    const geometries = event?.view?.geometries?.[0];
    if (geometries && geometries?.elements) {
      reporter({ scale: geometries.getXScale(), elements: geometries?.elements });
    }
    // console.log(geometries.getXScale());
    // console.log(geometries.getXYFields());
  });
  fetchChartConfig(linkView, options, config);
  handleInterval(linkView, options, config, 'bar');
  linkView.coordinate().transpose();
  linkView.render();

  chart.coordinate().transpose();
  chart.legend(false);
  chart.render();
  return { chart, views: [linkView] };
};

export const handleLegend = (charts: (Chart | View)[], legends: ILegends, config: any) => {
  const barConfig = getShapeConfig(config, 'bar');
  if (barConfig.color) {
    charts.map((chart: Chart | View) => {
      handleLegendBehavior(chart, legends, barConfig.color);
    });
  }
};
