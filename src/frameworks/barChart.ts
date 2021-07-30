import { Chart } from "@antv/g2";
import { IChartConfig, IChartOptions, ILegends } from "../interface";
import { BAR_TEXTURE, colors, DEFAULT_REDIUS } from "../theme";
import { handleLegendBehavior, renderChart } from "./common";

import "./shapes/intervalDefaultElement";
import { setCustomInfo } from "./utils";

const interval = (
  chart: Chart,
  options: IChartOptions,
  config: IChartConfig,
  useDash: boolean,
  styleCallback?: any
) => {
  const barConfig = config.bar || {};
  const customInfo = { useDash } as { [key: string]: any };
  let interval: any = chart.interval();
  if (barConfig.position) {
    interval = interval.position(barConfig.position);
  }
  if (barConfig.color) {
    interval = interval.color(barConfig.color);
    interval.shape(barConfig.color, ["default-element"]);
  }
  if (barConfig.adjust) {
    interval.adjust(barConfig.adjust);
    if (barConfig.adjust === "stack") {
      customInfo.isStack = true;
    }
  }
  if (barConfig.color && styleCallback) {
    interval.style(barConfig.color, styleCallback);
  }
  interval.customInfo(setCustomInfo(options, config, customInfo));
  return interval;
};

export const barChart = (options: IChartOptions, config: IChartConfig) => {
  const { legends, hasDashed } = options;
  const chart = renderChart(options, config);
  const dashedBars: string[] = [];

  chart.theme({
    styleSheet: {
      paletteQualitative10: colors,
    },
  });

  // 渲染出基本柱状图
  interval(chart, options, config, false, (label: string) => {
    const legend = legends[label] || {};
    if (legend?.dashed) {
      dashedBars.push(label);
    }
    return {
      fill: legend.color,
      radius: DEFAULT_REDIUS,
    };
  });

  // 若有条纹柱子，需要再次绘制
  if (hasDashed) {
    interval(chart, options, config, true, (label: string) => {
      const legend = legends[label] || {};
      if (legend.dashed) {
        return {
          fill: `p(a)${BAR_TEXTURE}`,
          radius: DEFAULT_REDIUS,
        };
      }
      return { fill: legend.color, radius: DEFAULT_REDIUS };
    });
  }
  chart.render();
  return chart;
};

export const handleLegend = (chart: Chart, legends: ILegends, config: any) => {
  const barConfig = config.bar || {};
  if (barConfig.color) {
    handleLegendBehavior(chart, legends, barConfig.color);
  }
};
