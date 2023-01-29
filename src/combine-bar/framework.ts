import { Chart, Event, View } from '@antv/g2';
import { ChartConfig, ChartOptions, ChartType } from '../interfaces';
import { handleInterval } from '../column/framework';
import { BaseChart, fetchTooltip, fetchViewConfig, generateChart } from '../core/framework';
import { Datum } from '@antv/g2/lib/interface';

export const updateChart = ({ chart, views = [] }: { chart: Chart; views?: View[] }, data: Datum[]) => {
  const linkView = views?.[0];
  linkView?.changeData(data.slice().reverse());
  linkView?.render(true);

  chart.render(true);
  chart.forceFit();
};

class CombineBar extends BaseChart {
  render = (options: ChartOptions, config: ChartConfig) => {
    const { id, report, data, legends } = options;
    if (!id) {
      return {};
    }
    const { point, annotation } = config;
    const { color = '', position = '', shape = 'circle', size = 1, adjust = [] } = point;

    const { line = {}, text = {} } = annotation;
    const chart = generateChart(options, config);
    try {
      const linkView = chart.createView({
        region: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      });

      fetchViewConfig(linkView, { ...options, data: data?.slice()?.reverse() }, config);
      linkView
        .point()
        .color(color)
        .position(position)
        .size(size)
        .shape(shape)
        .style(color, (val) => {
          const legend = (legends as any)?.[val];
          return {
            fill: legend?.pointColor || legend?.color,
          };
        })
        .adjust(adjust[0]);
      linkView.annotation().line(line).text(text);
      handleInterval(linkView, options, config, {}, ChartType.BAR);
      linkView.coordinate().transpose();
      linkView.on('afterrender', function (event: Event) {
        const geometries = event.view.geometries[0];
        if (geometries && geometries.elements) {
          report?.({ scale: geometries.getXScale(), elements: geometries.elements });
        }
      });
      linkView
        .point()
        .color(color)
        .position(position)
        .size(size)
        .shape(shape)
        .style(color, (val) => {
          const legend = (legends as any)?.[val];
          return {
            fill: legend?.pointColor || legend?.color,
          };
        })
        .adjust(adjust[0]);
      linkView.render();

      fetchTooltip(chart, config);
      chart.coordinate().transpose();
      chart.legend(false);
      chart.render();
      this.instance = chart;
      // this.update = updateChart;
      return { chart, views: [linkView], update: updateChart };
    } catch (err) {
      // show error
    }
    return { chart, update: updateChart };
  };
}

export default CombineBar;
