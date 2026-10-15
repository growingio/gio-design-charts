import { LooseObject } from '@antv/g-base';
import { Chart, View } from '@antv/g2';
import { Datum } from '@antv/g2/lib/interface';
import { intervalShape } from '../column/framework';
import { BaseChart, fetchTooltip, fetchViewConfig, generateChart } from '../core/framework';
import { ChartConfig, ChartOptions, Legend, ChartType, Shape, AdjustOptionType, Legends } from '../interfaces';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { getAxisFields } from '../utils/frameworks/axis';
import { DEFAULT_RADIUS } from '../theme';

export class DoubleAxes extends BaseChart {
  columnView: View | undefined = undefined;
  lineView: View | undefined = undefined;
  options: ChartOptions | undefined = undefined;
  config: ChartConfig | undefined = undefined;

  /**
   * 根据 Shape 的 position 配置，从完整数据中过滤出该 shape 对应的数据子集
   * 过滤依据：Y 轴字段有值的记录才属于该 shape
   */
  private filterDataByPosition(data: Datum[], position: string | undefined): Datum[] {
    if (!position || !Array.isArray(data) || data.length === 0) {
      return data || [];
    }
    const fields = getAxisFields(position);
    const yField = fields[1]; // position 格式为 'x*y'，取 y 字段
    if (!yField) {
      return data;
    }
    return data.filter((item: Datum) => {
      const v = (item as LooseObject)[yField];
      return v !== undefined && v !== null && v !== '';
    });
  }

  lineShape = (chart: Chart | View, options: ChartOptions, shapeConfig: Shape) => {
    const { legendObject } = options;
    const line = chart.line({
      theme: {
        strokeWidth: 2,
      },
    });

    if (shapeConfig.adjust) {
      line.adjust.call(line, shapeConfig.adjust as AdjustOptionType);
    }
    line.position((shapeConfig as any).position);
    if (shapeConfig?.shape) {
      line.shape('split-line');
    }
    if (shapeConfig.color) {
      line.color(shapeConfig.color);
      line.style(shapeConfig.color, (label: string) => {
        const legend = legendObject?.getLegend(label) || ({} as Legend);
        const style = {} as LooseObject;
        style.stroke = legend?.color || '#5F87FF';
        if (legend.lineDash) {
          style.lineDash = legend.lineDash;
        }
        // default width of line is 2px
        style.lineWidth = 2;
        return style;
      });
    }
    return line;
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    const { id, legendObject, defaultStyles = {}, data } = options;
    if (!id) {
      /* istanbul ignore next */
      return {};
    }

    this.config = config;
    this.options = options;

    // 主 chart 仅作为容器，不直接设置 data/scale/axis（这些放到子 View 上）
    // 这样避免 G2 v4 父子 Chart/View 在数据不一致时触发 scale 同步无限递归
    this.instance = generateChart(options, config);
    // 开启 G2 多 View padding 同步：渲染时取各子 View autoPadding 的逐向最大值统一应用，
    // 保证隐藏 lineView X 轴后，柱/线两个 View 的绘图区完全重合（0 轴基线对齐、线点与柱中心对齐）
    (this.instance as any).syncViewPadding = true;

    // 获取 column 和 line 的 shape 配置
    const columnCfg = getShapeConfig(config, ChartType.COLUMN);
    const lineCfg = getShapeConfig(config, ChartType.LINE);

    // 分别过滤出 column 数据和 line 数据
    const columnData = this.filterDataByPosition(data as Datum[], (columnCfg as Shape).position);
    const lineData = this.filterDataByPosition(data as Datum[], (lineCfg as Shape).position);

    // 从 position 中提取 X/Y 轴字段名
    const columnPos = (columnCfg as Shape).position || '';
    const linePos = (lineCfg as Shape).position || '';
    const xField = getAxisFields(columnPos)[0];
    const lineYField = getAxisFields(linePos)[1];

    // columnView —— 只加载 column 数据，调用 fetchViewConfig 统一设置 data/scale/axis
    const columnView = this.instance.createView();
    fetchViewConfig(columnView, { ...options, data: columnData }, config);
    intervalShape(
      columnView,
      { ...options, data: columnData },
      config,
      { ...columnCfg, customInfo: { chartType: ChartType.COLUMN, useDash: false } },
      (label: string) => {
        const legend = legendObject?.getLegend(label) || ({} as Legend);
        return {
          fill: legend.color || defaultStyles.color,
          radius: DEFAULT_RADIUS,
        };
      }
    );

    // lineView —— 只加载 line 数据，调用 fetchViewConfig 统一设置 data/scale/axis
    const lineView = this.instance.createView();
    fetchViewConfig(lineView, { ...options, data: lineData }, config);
    this.lineShape(lineView, { ...options, data: lineData }, lineCfg);
    // 将 line 的 Y 轴移到右侧，形成双 Y 轴
    if (lineYField) {
      const rightAxisCfg = { position: 'right' as const, ...(config.axises?.find(([name]: [string, any]) => name === lineYField)?.[1] || {}) };
      lineView.axis(lineYField, rightAxisCfg);
    }
    // lineView 不独立渲染 X 轴标签（由 columnView 渲染一次即可）；
    // 绘图区对齐由上方 syncViewPadding 保证，隐藏 X 轴不会导致 lineView 下移
    if (xField) {
      lineView.axis(xField, false);
    }

    this.columnView = columnView;
    this.lineView = lineView;
    this.views = [columnView, lineView];

    // tooltip 必须在主 Chart 上设置（G2 View 上的 tooltip 无效），且在 createView 之后调用
    fetchTooltip(this.instance, config);
    this.instance.legend(false);
    this.instance.render();
    this.instance.render(true);
  };

  /**
   * 覆写图例过滤：逐 View 设置 filter 后，只通过主 Chart 触发一次渲染。
   * 不能沿用 BaseChart.defaultLegendBehavior 的逐 View render(true)——
   * 子 View 单独渲染时会以自身 autoPadding 重绘，绕过 syncViewPadding 的
   * 取最大值同步，导致筛选后柱/线绘图区错位（0 轴不在同一水平线）。
   */
  legend = (legends: Legends) => {
    const shapeConfig = getShapeConfig(this.config, this.config?.type);
    if (this.instance && shapeConfig.color) {
      [this.instance, ...this.views]?.forEach((content: Chart | View) => {
        content.filter(shapeConfig.color, (value: string) => !!(legends?.[value] || {}).active);
      });
      this.instance.render(true);
    }
  };

  update = (data: Datum[]) => {
    if (!this.instance || !this.columnView || !this.lineView) return;

    const columnCfg = getShapeConfig(this.config as ChartConfig, ChartType.COLUMN);
    const lineCfg = getShapeConfig(this.config as ChartConfig, ChartType.LINE);

    const columnData = this.filterDataByPosition(data, (columnCfg as Shape).position);
    const lineData = this.filterDataByPosition(data, (lineCfg as Shape).position);

    // 只更新数据、不触发各 View 独立重绘（changeData 内部会 paint(true)，
    // 子 View 自身未开启 syncViewPadding，会以未同步的 padding 绘制产生中间态）；
    // 最后通过主 Chart 统一渲染一次，走 chart 级 padding 同步
    this.columnView.data(columnData);
    this.lineView.data(lineData);
    this.instance.render(true);
  };
}
