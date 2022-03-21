import { Datum } from '@antv/g2/lib/interface';
import { BaseChart, fetchConfig, fetchTooltip, generateChart } from '../core/framework';
import { ChartOptions, ChartType } from '../interfaces';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { getPointShapeState } from '../utils/tools/shapeState';
import { bindPointColor, bindPosition, bindShape, bindSize, bindState } from '../utils/frameworks/geometry';

export class Bubble extends BaseChart {
  update = (data: Datum[]) => {
    this.instance?.changeData(data);
    this.instance?.render(true);
    this.instance?.forceFit();
  };

  render = <BubbleConfig>(options: ChartOptions, config: BubbleConfig) => {
    this.options = options;
    this.config = config;

    const { id, legendObject } = options;
    if (!id) {
      return {};
    }
    const bubbleCfg = getShapeConfig(config, ChartType.BUBBLE);
    this.instance = generateChart(options, config);
    fetchConfig(this.instance, options, config);

    const point = this.instance.point();
    bindPosition(point, bubbleCfg.position);
    bindSize(point, bubbleCfg.size);
    bindPointColor(point, bubbleCfg.color, legendObject?.mapping || {});
    bindShape(point, 'circle');
    bindState(point, getPointShapeState());

    fetchTooltip(this.instance, config);
    this.instance.interaction('element-highlight');
    this.instance.interaction('brush');
    this.instance.render();
  };
}
