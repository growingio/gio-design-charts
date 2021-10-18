import { Chart, Event, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legends } from '../interfaces';
import { handleInterval } from '../column/framework';
import { fetchTooltip, fetchViewConfig, generateChart, handleLegendBehavior } from '../core/framework';
import { getShapeConfig } from '../utils/tools/configUtils';
import { Datum } from '@antv/g2/lib/interface';

export const updateChart = ({ chart, views = [] }: { chart: Chart; views?: View[] }, data: Datum[]) => {
  const linkView = views?.[0];
  linkView?.changeData(data);
  linkView?.render(true);

  chart.render(true);
  chart.forceFit();
};

export const barChart = (options: ChartOptions, config: ChartConfig) => {
  const { id, report } = options;
  if (!id) {
    return {};
  }
  const chart = generateChart(options, config);
  try {
    const linkView = chart.createView({
      region: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
    });

    fetchViewConfig(linkView, options, config);
    handleInterval(linkView, options, config, 'bar');
    linkView.coordinate().transpose();
    linkView.on('afterrender', function (event: Event) {
      const geometries = event.view.geometries[0];
      if (geometries && geometries.elements) {
        report?.({ scale: geometries.getXScale(), elements: geometries.elements });
      }
    });
    linkView.render();

    fetchTooltip(chart, config);
    chart.coordinate().transpose();
    chart.legend(false);
    chart.render();
    return { chart, views: [linkView], update: updateChart };
  } catch (err) {
    // show error
  }
  return { chart, update: updateChart };
};

export const handleLegend = <BarConfig>(charts: (Chart | View)[], legends: Legends, config: BarConfig) => {
  const barConfig = getShapeConfig(config, 'bar');
  if (barConfig.color) {
    charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, barConfig.color));
  }
};
