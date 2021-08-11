import { Chart, View } from '@antv/g2';
import { IChartConfig, IChartOptions, ILegend, ILegends } from '../interface';
import { DEFAULT_REDIUS } from '../theme';
import { interval } from './columnChart';
import { fetchChartConfig, generateChart, handleLegendBehavior } from './common';
import { addLinkByElementHigh } from './tools/elementLink';
import { getShapeConfig } from './utils';

const fetchInterval = (chart: Chart | View, options: IChartOptions, config: IChartConfig) => {
  const { legends, defaultStyles = {} } = options;
  return interval(chart, options, config, {}, (label: string) => {
    const legend = legends?.[label] || ({} as ILegend);
    return {
      stroke: '#fff',
      fill: legend.color,
      radius: DEFAULT_REDIUS,
      ...defaultStyles,
    };
  });
};

export const comparativeFunnelChart = (options: IChartOptions, config: IChartConfig) => {
  const chart = generateChart(options, config);
  const sourceData = options?.data?.source || [];
  const covertData = options?.data?.covert || [];
  const texts = options?.data?.texts || [];

  const backgroundView = chart.createView();
  const backgroundOptions = {
    ...options,
    data: covertData,
    control: {
      hideLabel: true,
    },
    defaultStyles: {
      opacity: 0.2,
    },
  };
  fetchChartConfig(backgroundView, backgroundOptions, config);
  fetchInterval(backgroundView, backgroundOptions, config);
  backgroundView.render();

  const addLinkByElement = addLinkByElementHigh();

  const linkView = chart.createView();
  const linkOptions = { ...options, data: sourceData };
  linkView.on('afterrender', function (event: any) {
    if (sourceData.length !== 0) {
      addLinkByElement(event?.view, { texts });
    }
  });
  fetchChartConfig(linkView, linkOptions, config);
  fetchInterval(linkView, linkOptions, config);
  linkView.render();

  chart.legend(false);
  chart.render();
  return { chart, views: [linkView, backgroundView] };
};

export const funnelChart = (options: IChartOptions, config: IChartConfig) => {
  const chart = generateChart(options, config);
  const linkView = chart.createView();

  const addLinkByElement = addLinkByElementHigh();

  linkView.on('afterrender', function (event: any) {
    addLinkByElement(event?.view, {});
  });

  fetchChartConfig(linkView, options, config);
  fetchInterval(linkView, options, config);
  linkView.render();

  const normalView = fetchChartConfig(chart.createView(), options, config);
  fetchInterval(normalView, options, config);
  // linkView.annotation().text({
  //   content: 'test24444',
  //   position: [200, 100],
  // });
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
