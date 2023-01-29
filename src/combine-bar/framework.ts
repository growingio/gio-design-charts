import { Chart, Element, Event, View } from '@antv/g2';
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
    console.log(options);
    const { id, report, data, legendObject } = options;
    if (!id) {
      return {};
    }
    const { point, annotation } = config;
    const { color = '', position = '', shape = 'circle', size = 1, adjust = [] } = point;

    const { line = {}, text = {} } = annotation;
    const chart = generateChart(options, config);

    const renderPoint = (pointView: View) => {
      pointView
        .point()
        .color(color)
        .position(position)
        .size(size)
        .shape(shape)
        .style(color, (val) => {
          const legend: any = legendObject?.getLegend(val);
          return {
            zIndex: 1000,
            fill: legend?.pointColor || legend?.color,
          };
        })
        .state({
          active: {
            style: (element: Element) => {
              const modelFill = element?.getModel?.()?.style?.fill;
              const modelColor = element?.getModel?.()?.color;
              return {
                lineWidth: 2,
                stroke: modelFill || modelColor || '#000',
                strokeOpacity: 0.5,
              };
            },
          },
        })
        .adjust(adjust[0]);
    };
    try {
      const linkView = chart.createView({
        region: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      });

      renderPoint(linkView);

      linkView.coordinate().transpose();
      linkView.annotation().line(line).text(text);

      fetchViewConfig(linkView, { ...options, data: data?.slice()?.reverse() }, config);
      handleInterval(linkView, options, config, {}, ChartType.BAR);
      renderPoint(linkView);

      linkView.on('afterrender', function (event: Event) {
        const geometries = event.view.geometries[0];
        if (geometries && geometries.elements) {
          report?.({ scale: geometries.getXScale(), elements: geometries.elements });
        }
      });

      // linkView
      //   .point()
      //   .color(color)
      //   .position(position)
      //   .size(size)
      //   .shape(shape)
      //   .style(color, (val) => {
      //     const legend: any = legendObject?.getLegend(val);
      //     console.log(legend, legend?.pointColor, legend?.color);
      //     return {
      //       default: { fill: '#002200' || legend?.color },
      //       active: {
      //         lineWidth: 2,
      //         stroke: legend?.pointColor || legend?.color,
      //         strokeOpacity: 0.5,
      //       },
      //     };
      //   })
      //   // .style({
      //   //   active: {
      //   //     style: (val: string) => {
      //   //       const legend: any = legendObject?.getLegend(val);
      //   //       console.log(legend);
      //   //       return {
      //   //         lineWidth: 2,
      //   //         stroke: legend?.pointColor || legend?.color,
      //   //         strokeOpacity: 0.5,
      //   //       };
      //   //     },
      //   //   },
      //   // })
      //   .adjust(adjust[0]);
      console.log(line, text);

      linkView.render();

      fetchTooltip(chart, config);
      chart.coordinate().transpose();
      chart.legend(false);
      chart.render();
      this.instance = chart;
      this.views = [linkView];
      // this.update = updateChart;
      return { chart, views: [linkView], update: updateChart };
    } catch (err) {
      // show error
    }
    return { chart, update: updateChart };
  };
}

export default CombineBar;
