import { get } from 'lodash';
import { ChartConfig, ChartOptions, ChartType } from '../interfaces';
import { colors } from '../theme';
import { BaseChart, fetchViewConfig, generateChart } from '../core/framework';
import { bindGuageCoordination } from '../utils/frameworks/coordinate';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { gaugeText } from '../utils/frameworks/text';
import { formatNumber, formatPercent } from '../utils/formatNumber';
import { View } from '@antv/g2';
import { LooseObject } from '@antv/g-base';

export class Gauge extends BaseChart {
  view: View | undefined = undefined;

  update = (data: LooseObject[]) => {
    this.view?.clear();
    if (this.view) {
      this.renderView(this.view, data, this.config as ChartConfig);
    }
    this.view?.render(true);
    this.instance?.render(true);
  };

  renderView = (view: View, data: LooseObject[], config: ChartConfig) => {
    const { dict = {} } = this.options || {};
    const gaugeCfg = getShapeConfig(config, ChartType.GAUGE);
    const { position, title, subTitle } = gaugeCfg;

    const value = get(data, `[0].${position}`);
    const max = get(data, '[0].max');

    view.line().position(`${position}*1`).color('#00000000');
    view.scale(position, {
      min: 0,
      max: max || 1,
    });

    view.axis(position, false);
    // 绘制背景
    view.annotation().arc({
      top: false,
      start: [0, 1],
      end: [max || 1, 1],
      style: {
        stroke: `${colors[0]}30`,
        lineWidth: 20,
        lineDash: null,
      },
    });
    // 绘制指标
    view.annotation().arc({
      start: [0, 1],
      end: [value || 0, 1],
      style: {
        stroke: colors[0],
        lineWidth: 20,
        lineDash: null,
      },
    });

    const rate = max ? formatPercent(value / max) : '--';
    let fixedSubTitle = typeof subTitle === 'number' ? formatNumber(subTitle) : subTitle;
    fixedSubTitle = fixedSubTitle || (value ? formatNumber(value) : dict.noData);
    gaugeText(title || `${dict.rate}${rate}`, fixedSubTitle || formatNumber(value), view, config);
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    this.config = config;
    this.options = options;
    const { id, data } = options;
    if (!id) {
      /* istanbul ignore next */
      return {};
    }
    this.instance = generateChart(options, config);

    const view = this.instance.createView();
    fetchViewConfig(view, options, config);
    bindGuageCoordination(view);
    this.views.push(view);

    this.renderView(view, data as LooseObject[], config);

    view.render();
    this.view = view;

    this.instance.tooltip(false);
    this.instance.legend(false);
    this.instance.render();
  };
}
