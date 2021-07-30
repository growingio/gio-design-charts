import { Chart } from "@antv/g2";
import { IChartConfig, IChartOptions, ILegends } from "../interface";
import { colors, DEFAULT_REDIUS } from "../theme";
import { handleLegendBehavior, renderChart } from "./common";

import "./shapes/intervalDefaultElement";
import { setCustomInfo } from "./utils";

const interval = (
  chart: Chart,
  options: IChartOptions,
  config: IChartConfig,
  styleCallback?: any
) => {
  const barConfig = config.bar || {};
  let interval: any = chart.interval();
  if (barConfig.position) {
    interval = interval.position(barConfig.position);
  }
  if (barConfig.color) {
    interval = interval.color(barConfig.color);
  }
  if (barConfig.adjust) {
    interval.adjust(barConfig.adjust);
  }
  if (barConfig.color && styleCallback) {
    interval.style(barConfig.color, styleCallback);
  }
  interval.shape("company", ["default-element"]);
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
  interval(chart, options, config, (label: string) => {
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
    const intervalObj = interval(chart, options, config, (label: string) => {
      const legend = legends[label] || {};
      if (legend.dashed) {
        return {
          fill: "p(n)http://localhost:6006/acorn_PNG37019.png",
          radius: DEFAULT_REDIUS,
        };
      }
      return { fill: legend.color, radius: DEFAULT_REDIUS };
    });
    intervalObj.customInfo(setCustomInfo(options, config));
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
