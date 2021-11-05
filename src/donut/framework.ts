import { LooseObject } from '@antv/g-base';
import { Chart, View } from '@antv/g2';
import { Datum } from '@antv/g2/lib/interface';
import { ChartType } from '../interfaces';
import { intervalShape } from '../column/framework';
import { fetchConfig, fetchIntervalLabel, fetchTooltip, generateChart, handleLegendBehavior } from '../core/framework';
import { ChartConfig, ChartOptions, Legend, Legends } from '../interfaces';
import { getShapeConfig } from '../utils/tools/configUtils';

export class Donut {
  chart: Chart | undefined;
  constructor() {
    this.chart = undefined;
  }

  addText = (chart: Chart | View, data: LooseObject) => {
    const { title, count } = data;
    if (title) {
      chart?.annotation()?.text({
        position: ['50%', '50%'],
        content: title,
        style: {
          fontSize: 14,
          fill: '#313E75',
          lineWidth: 2,
          textAlign: 'center',
        },
        offsetY: -12,
      });
    }
    if (count || count === 0) {
      chart?.annotation()?.text({
        position: ['50%', '50%'],
        content: count,
        style: {
          fontSize: 20,
          fill: '#313E75',
          textAlign: 'center',
        },
        offsetY: 12,
      });
    }
  };

  update = ({ chart, views = [] }: { chart: Chart; views?: View[] }, data: Datum | Datum[]) => {
    const [donutView, textView] = views;
    if (Array.isArray(data)) {
      donutView?.changeData(data);
    } else if (Array.isArray(data?.source)) {
      donutView?.changeData(data.source);
    }
    donutView?.render(true);

    textView.clear();
    this.addText(textView, data);
    textView?.render(true);

    chart.render(true);
    chart.forceFit();
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    const { id, legends = {}, defaultStyles = {}, data } = options;
    if (!id) {
      return {};
    }

    const chart = generateChart(options, config);
    const donutView = chart.createView();
    fetchConfig(donutView, options, config);
    const interval = intervalShape(donutView, options, config, {}, (label: string) => {
      const legend = legends[label] || ({} as Legend);
      return {
        stroke: '#fff',
        lineWidth: 2,
        fill: legend.color || defaultStyles.color,
      };
    });
    interval.adjust('stack');
    interval.shape('slice-shape');

    const labelStyles = {
      style: { fontSize: 12 },
      layout: { type: 'pie-outer' },
    };
    const donutConfig = config[ChartType.DONUT] || {};
    fetchIntervalLabel(
      interval,
      config,
      (percent: number) => {
        return {
          content: (dataItem: LooseObject) => `${dataItem[donutConfig.color || 'name']}: ${percent * 100}%`,
        };
      },
      labelStyles
    );
    donutView.coordinate('theta', {
      radius: 0.85,
      innerRadius: 0.55,
    });

    const textView = chart.createView();
    textView.coordinate('theta', {
      radius: 0.9,
      innerRadius: 0.7,
    });
    fetchConfig(textView, options, config);
    this.addText(textView, data as LooseObject);
    textView.render();
    fetchTooltip(chart, config);
    chart.render();
    return { chart, views: [donutView, textView], update: this.update };
  };

  legend = <DonutConfig>(charts: (Chart | View)[], legends: Legends, config: DonutConfig) => {
    const donut = getShapeConfig(config, 'donut');
    if (donut.color) {
      charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, donut.color));
    }
  };
}
