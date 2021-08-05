import { Chart, View } from '@antv/g2';
import { IChartConfig, IChartOptions, ILegends } from '../interface';
import { DEFAULT_REDIUS } from '../theme';
import { interval } from './columnChart';
import { fetchChartConfig, generateChart, handleLegendBehavior } from './common';
import { addLinkByElementHigh } from './shapes/elementLink';
import { getShapeConfig } from './utils';

const addInterval = (chart: Chart | View, options: IChartOptions, config: IChartConfig) => {
  const { legends } = options;
  interval(chart, options, config, {}, (label: string) => {
    const legend = legends[label] || {};
    return {
      stroke: '#fff',
      // strokeWidth: 1,
      fill: legend.color,
      radius: DEFAULT_REDIUS,
    };
  });
};

export const funnelChart = (options: IChartOptions, config: IChartConfig) => {
  const chart = generateChart(options, config);
  const linkView = chart.createView();

  const addLinkByElement = addLinkByElementHigh();

  linkView.on('afterrender', function (event: any) {
    addLinkByElement(event?.view);
  });
  fetchChartConfig(linkView, options, config);
  addInterval(linkView, options, config);
  linkView.render();

  const normalView = fetchChartConfig(chart.createView(), options, config);
  addInterval(normalView, options, config);
  normalView.render();

  chart.legend(false);
  chart.render();
  return { chart, views: [linkView, normalView] };
};

export const handleLegend = (charts: (Chart | View)[], legends: ILegends, config: any) => {
  const barConfig = getShapeConfig(config, 'funnel');
  if (barConfig.color) {
    charts.map((chart: Chart | View) => {
      handleLegendBehavior(chart, legends, barConfig.color);
    });
  }
};
