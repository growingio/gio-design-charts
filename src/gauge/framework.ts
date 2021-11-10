import { get, subtract } from 'lodash';
import { ChartConfig, ChartOptions, ChartType } from '../interfaces';
import { colors } from '../theme';
import { renderChart } from '../core/framework';
import { bindGuageCoordination } from '../utils/frameworks/coordinate';
import { getShapeConfig } from '../utils/tools/configUtils';
import { gaugeText } from '../utils/frameworks/text';
import { formatNumber, formatPercent } from '../utils/formatNumber';

export class Gauge {
  render = (options: ChartOptions, config: ChartConfig) => {
    const { id, data, dict = {} } = options;
    if (!id) {
      return {};
    }
    const chart = renderChart(options, config);
    bindGuageCoordination(chart);
    const gaugeCfg = getShapeConfig(config, ChartType.GAUGE);
    const { position, title, subTitle } = gaugeCfg;

    const value = get(data, `[0].${position}`);
    const max = get(data, '[0].max');

    chart.scale(position, {
      min: 0,
      max: max || 1,
    });

    chart.axis(position, false);
    chart.line().position(`${position}*1`).color('#00000000');
    // 绘制背景
    chart.annotation().arc({
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
    chart.annotation().arc({
      start: [0, 1],
      end: [value || 0, 1],
      style: {
        stroke: colors[0],
        lineWidth: 20,
        lineDash: null,
      },
    });

    const rate = max ? formatPercent(value / max) : '--';

    const fixedSubTitle = typeof subTitle === 'number' ? formatNumber(subTitle) : subTitle;
    gaugeText(title || `${dict.rate}${rate}`, fixedSubTitle || formatNumber(value), chart, config);

    chart.tooltip(false);
    chart.legend(false);
    chart.render();
    return { chart };
  };
  legend = () => {};
}
