import { Chart, Event, View } from '@antv/g2';
import { isEmpty } from 'lodash';
import { ChartConfig, ChartOptions, Legend, Legends } from '../interfaces';
import { colors, DEFAULT_REDIUS } from '../theme';
import { intervalShape } from '../column/framework';
import { fetchTooltip, fetchViewConfig, generateChart, handleLegendBehavior } from '../core/framework';
import { addLinkByElementHigh } from '../utils/tools/elementLink';
import { getShapeConfig } from '../utils/tools/configUtils';
import { viewTheme } from '../theme/chart';
import { LooseObject } from '@antv/g-base';

const fetchInterval = (chart: Chart | View, options: ChartOptions, config: ChartConfig) => {
  const { legends, defaultStyles } = options;
  return intervalShape(
    chart,
    options,
    config,
    {
      styles: {
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

const bindLinkEvent = (linkView: View, addLinkByElement: any, data?: LooseObject) => {
  const sourceData = data?.source || [];
  const texts = data?.texts || [];
  const isGroup = data?.isGroup;
  linkView?.on('afterrender', function (event: Event) {
    if (event && !isGroup && sourceData.length !== 0) {
      addLinkByElement(event.view as any, { texts });
    }
  });
};

export const updateHoc = () => {
  const addLinkByElement = addLinkByElementHigh();
  return [
    addLinkByElement,
    ({ chart, views = [] }: { chart: Chart; views: View[] }, data: LooseObject) => {
      const sourceData = data?.source || [];
      const covertData = data?.covert || [];
      const [linkView, backgroundView] = views;
      backgroundView?.changeData(covertData);
      backgroundView?.render(true);

      linkView?.changeData(sourceData);
      bindLinkEvent(linkView, addLinkByElement, data);

      linkView?.render(true);
      chart.render(true);
    },
  ];
};

export const funnelChart = (options: ChartOptions, config: ChartConfig = {}) => {
  const { id } = options;
  if (!id || isEmpty(options.data)) {
    return {};
  }
  const { interceptors, legends } = options;
  const chart = generateChart(options, config);
  const [addLinkByElement, updateFunnel] = updateHoc();
  try {
    const sourceData = options.data?.source || [];
    const covertData = options.data?.covert || [];
    const isGroup = options.data?.isGroup;

    const emptyLegends = isEmpty(legends);

    // Use viewTheme to set the label of axis is white
    const backgroundView = chart.createView({
      theme: viewTheme,
    });
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
    fetchViewConfig(backgroundView, backgroundOptions, { ...config, axis: false });
    fetchInterval(backgroundView, backgroundOptions, config);
    backgroundView.interaction('element-active');
    backgroundView.render();

    const linkView = chart.createView();
    const linkOptions = {
      ...options,
      data: sourceData,
      defaultStyles: {
        color: emptyLegends ? colors[0] : '',
      },
    };
    bindLinkEvent(linkView, addLinkByElement, options.data);
    // should add view.render() for linkView, it can trigger afterrender event.
    if (isGroup) {
      linkView.interaction('element-highlight-by-color');
      linkView.interaction('element-link');
    }
    fetchViewConfig(linkView, linkOptions, config);
    fetchInterval(linkView, linkOptions, config);
    linkView.render();

    fetchTooltip(chart, config);
    chart.legend(false);
    chart.render();
    interceptors?.bindElementEvents(chart);
    return { chart, views: [linkView, backgroundView], update: updateFunnel };
  } catch (err) {
    return { chart, update: updateFunnel };
  }
};

export const handleLegend = <FunnelConfig>(charts: (Chart | View)[], legends: Legends, config: FunnelConfig) => {
  const barConfig = getShapeConfig(config, 'funnel');
  if (barConfig.color) {
    charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, barConfig.color));
  }
};
