import { Chart, View } from '@antv/g2';
import { isEmpty } from 'lodash';
import { ChartConfig, ChartOptions, Legend, Legends } from '../interfaces';
import { colors, DEFAULT_REDIUS } from '../theme';
import { intervalShape } from '../column/framework';
import { fetchChartConfig, fetchTooltip, generateChart, handleLegendBehavior } from '../core/framework';
import { addLinkByElementHigh } from '../utils/tools/elementLink';
import { getShapeConfig } from '../utils/frameworks/utils';

const fetchInterval = (chart: Chart | View, options: ChartOptions, config: ChartConfig) => {
  const { legends, defaultStyles } = options;
  return intervalShape(
    chart,
    options,
    config,
    {
      intervalStyles: {
        dodgePadding: 4,
        minColumnWidth: 40,
      },
    },
    (label: string) => {
      const legend = legends?.[label] || ({} as Legend);
      return {
        stroke: '#fff',
        strokeWidth: 1,
        fill: legend.color,
        radius: DEFAULT_REDIUS,
        ...defaultStyles,
      };
    }
  );
};

export const funnelChart = (options: ChartOptions, config: ChartConfig = {}) => {
  const { id } = options;
  if (!id) {
    return {};
  }
  const { interceptors, legends } = options;
  const chart = generateChart(options, config);
  try {
    const sourceData = options.data?.source || [];
    const covertData = options.data?.covert || [];
    const texts = options.data?.texts || [];
    const isGroup = options.data?.isGroup;

    const emptyLegends = isEmpty(legends);

    const backgroundView = chart.createView();
    const backgroundOptions = {
      ...options,
      data: covertData,
      control: {
        hideLabel: true,
      },
      defaultStyles: {
        opacity: 0.2,
        color: emptyLegends ? `l(270) 0:#ffffff 1:${colors[0]}` : '',
      },
    };
    fetchChartConfig(backgroundView, backgroundOptions, config);
    fetchInterval(backgroundView, backgroundOptions, config);
    backgroundView.interaction('element-active');
    backgroundView.render();

    const addLinkByElement = addLinkByElementHigh();

    const linkView = chart.createView();
    const linkOptions = {
      ...options,
      data: sourceData,
      defaultStyles: {
        color: emptyLegends ? colors[0] : '',
      },
    };
    linkView.on('afterrender', function (event: any) {
      if (event && !isGroup && sourceData.length !== 0) {
        addLinkByElement(event.view, { texts });
      }
    });
    // should add view.render() for linkView, it can trigger afterrender event.
    if (isGroup) {
      linkView.interaction('element-highlight-by-color');
      linkView.interaction('element-link');
    }
    fetchChartConfig(linkView, linkOptions, config);
    fetchInterval(linkView, linkOptions, config);
    linkView.render();

    fetchTooltip(chart, config);
    interceptors?.bindElementEvents(chart);
    chart.legend(false);
    chart.render();
    return { chart, views: [linkView, backgroundView] };
  } catch (err) {
    return { chart };
  }
};

export const handleLegend = (charts: (Chart | View)[], legends: Legends, config: any) => {
  const barConfig = getShapeConfig(config, 'funnel');
  if (barConfig.color) {
    charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, barConfig.color));
  }
};