import { Chart, View } from "@antv/g2";
import { IChartConfig, IChartOptions, ILegends } from "../interface";
import { BAR_TEXTURE, DEFAULT_REDIUS, DEFAULT_REDIUS_BAR } from "../theme";
import { handleLegendBehavior, renderChart } from "./common";

import "./shapes/intervalDefaultElement";
import { getShapeConfig, setCustomInfo } from "./utils";

export const interval = (
  chart: Chart | View,
  options: IChartOptions,
  config: IChartConfig,
  intervalConfig: any,
  styleCallback?: any
) => {
  const barConfig = getShapeConfig(config);
  const customInfo = intervalConfig || {};
  let interval: any = chart.interval();
  if (barConfig.position) {
    interval = interval.position(barConfig.position);
  }
  if (barConfig.color) {
    interval = interval.color(barConfig.color);
    interval.shape(barConfig.color, [
      `${intervalConfig.chartType || "column"}-element`,
    ]);
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

  if (barConfig?.label) {
    interval.label.apply(interval, barConfig.label);
  }
  interval.animate({
    enter: {
      animation: "fade-in", // 动画名称
      easing: "easeQuadIn", // 动画缓动效果
      delay: 0, // 动画延迟执行时间
      duration: 100, // 动画执行时间
    },
  });
  interval.customInfo(setCustomInfo(options, config, customInfo));
  return interval;
};

export const handleInterval = (
  options: IChartOptions,
  config: IChartConfig,
  type: string = "column"
) => {
  const { legends, hasDashed } = options;
  const chart = renderChart(options, config);
  const dashedBars: string[] = [];

  const radius = type === "column" ? DEFAULT_REDIUS : DEFAULT_REDIUS_BAR;

  // 渲染出基本柱状图
  interval(
    chart,
    options,
    config,
    { chartType: type, useDash: false },
    (label: string) => {
      const legend = legends[label] || {};
      if (legend?.dashed) {
        dashedBars.push(label);
      }
      return {
        stroke: "#fff",
        strokeWidth: 1,
        fill: legend.color,
        radius,
      };
    }
  );

  // 若有条纹柱子，需要再次绘制
  if (hasDashed) {
    interval(
      chart,
      options,
      config,
      {
        chartType: type,
        useDash: true,
      },
      (label: string) => {
        const legend = legends[label] || {};
        if (legend.dashed) {
          return {
            fill: `p(a)${BAR_TEXTURE}`,
            radius,
          };
        }
        return { fill: legend.color, radius };
      }
    );
  }
  return chart;
};

export const columnChart = (options: IChartOptions, config: IChartConfig) => {
  const chart = handleInterval(options, config);
  chart.render();
  return { chart };
};

export const handleLegend = (
  charts: (Chart | View)[],
  legends: ILegends,
  config: any
) => {
  const barConfig = getShapeConfig(config, "column");
  if (barConfig.color) {
    charts.map((chart: Chart | View) => {
      handleLegendBehavior(chart, legends, barConfig.color);
    });
  }
};
