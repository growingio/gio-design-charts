import { Chart, View } from '@antv/g2';
import { ShapeAttrs } from '@antv/g-base';
import { ChartConfig, ChartOptions, Legend, Shape, AdjustOtptionType } from '../interfaces';
import { BaseChart, renderChart } from '../core/framework';
import { Line as LineCls } from '../line/framework';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { getAreaShapeState } from '../utils/tools/shapeState';

export class Area extends BaseChart {
  renderShape = (chart: Chart | View, options: ChartOptions, shapeConfig: Shape) => {
    const { legendObject } = options;
    const area = chart.area({
      theme: {
        strokeWidth: 0,
      },
    });
    area.position(shapeConfig.position);
    area.color(shapeConfig.color);
    if (shapeConfig.adjust) {
      area.adjust.call(area, shapeConfig.adjust as AdjustOtptionType);
    }
    area.style(shapeConfig.color, (label: string) => {
      const legend = legendObject?.getLegend(label) || ({} as Legend);
      const style = {} as ShapeAttrs;
      style.fillOpacity = 0.8;
      // default width of line is 2px
      // style.lineWidth = 2;
      style.strokeOpacity = 0.4;
      if (legend.color) {
        style.fill = legend.color;
      }
      if (legend.opacity) {
        style.strokeOpacity = legend.opacity;
        style.fillOpacity = legend.opacity;
      }
      return style;
    });
    area.state(getAreaShapeState());
    return area;
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    this.options = options;
    this.config = config;
    const { id } = options;
    if (!id) {
      return {};
    }
    this.instance = renderChart(options, config);
    try {
      const areaConfig = getShapeConfig(config, 'area');
      const line = new LineCls();

      line.lineShape(this.instance, options, areaConfig);
      this.renderShape(this.instance, options, areaConfig);
      this.instance.interaction('element-highlight-by-color');
      this.instance.render();
      // like Line framework, render twice to fix wrong label issue.
      this.instance.render(true);
    } catch (err) {
      /* istanbul ignore next */
      console.log(err);
    }
  };
}
