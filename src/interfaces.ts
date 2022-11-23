import { LooseObject, ShapeAttrs } from '@antv/g-base';
import { Chart, Element, Scale, View } from '@antv/g2';
import { AdjustOption, AdjustType, ScaleOption } from '@antv/g2/lib/interface';
import { PropsWithChildren } from 'react';

export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  COLUMN = 'column',
  FUNNEL = 'funnel',
  AREA = 'area',
  DONUT = 'donut',
  BUBBLE = 'bubble',
  GAUGE = 'gauge',
  BOX = 'box',
}

export interface ShapeStyle extends Omit<ShapeAttrs, 'lineDash'> {
  lineDash?: boolean | number[] | null;
}

export interface Legend {
  /**
   * 图表Chart的类型，可为BAR、LINE等
   */
  type?: ChartType | string;

  // 图例Legend的名称
  name: string;

  // 别名
  alias?: string;

  // 是否已经激活显示图例，默认为true
  active?: boolean;

  // 设置图例的颜色，默认为12中显色定义
  color?: string;

  // 设置图例的透明度
  opacity?: number;

  // 柱状图的柱子是否为虚线
  dashed?: boolean;

  // 折线图的线是否为虚线，当是true，则显示默认虚线样子，若不是，请定义虚线
  // 详细设置请查看 https://g2.antv.vision/zh/docs/api/shape/shape-attrs#%E7%BA%BF%E6%9D%A1%E5%B1%9E%E6%80%A7
  lineDash?: boolean | number[];

  // 声明以哪个数据字段为分组依据
  dodgeBy?: string;

  width?: number;
}

export interface Legends {
  [key: string]: Legend;
}

export interface ChartOptions extends LooseObject {
  id?: HTMLElement;
  data?: LooseObject | LooseObject[];
  legends?: Legends;
  hasDashed?: boolean;
  /**
   * this is used to render the chart whether to subtract the legend height or not.
   */
  hasLegend?: boolean;
  chart?: Chart;
  views?: View[];
  theme?: LooseObject;
  dict?: LooseObject;
  /**
   * chart title
   */
  title?: string;
  /**
   * set default styles for line or interval
   */
  defaultStyles?: ShapeStyle;
}

export interface BaseChartConfig extends LooseObject {
  /**
   * 自动适应宽高
   */
  autoFit?: boolean;
  /**
   * 设置Chart的高度
   */
  height?: number;
  /**
   * 当为true时；渲染图表不显示动画。
   */
  closeAnimate?: boolean;
  /**
   * set the theme for chart
   */
  theme?: LooseObject | string;
}

export interface ChartConfig extends LooseObject {
  /**
   * 定义Chart的基础属性
   */
  chart?: BaseChartConfig;
  /**
   * 用来显示或隐藏Legend图例
   * 在gio-design-charts中，legend被重新定义，G2默认的legend配置将无效，在这里配置legend: false可用来隐藏Legend
   */
  legend?: boolean;

  /**
   * 1. chart.scale({ sale: { min: 0, max: 100} });
   * 2. chart.scale('sale', { min: 0, max: 100});
   * 3. chart.scale({ sale: { min: 0, max: 100} }, { nice: true });
   * 更多内容请参考： https://g2.antv.vision/zh/docs/api/general/scale#scaleoptionmintickinterval
   */
  scale?: Record<string, ScaleOption> | (string | ScaleOption)[];
}

export interface AreaConfig extends ChartConfig {
  /**
   * 用来创建面积图的配置
   */
  area: Shape;
}

export interface BoxConfig extends ChartConfig {
  /**
   * 用来创建箱型图的配置
   */
  box: Shape;
}

export interface BubbleConfig extends ChartConfig {
  /**
   * 用来创建气泡图
   */
  bubble: Shape;
}

export interface LineConfig extends ChartConfig {
  /**
   * 用来创建折线图的配置
   */
  line: Shape;
}

export interface GaugeConfig extends ChartConfig {
  /**
   * 用来创建仪表图的配置
   */
  gauge: Shape;
}

export interface ColumnConfig extends ChartConfig {
  /**
   * 用来创建柱状图的配置
   */
  column: Shape;
}

export interface DonutConfig extends Omit<ChartConfig, 'data'> {
  /**
   * 用来创建环形图的配置
   */
  donut: Shape;
}

export interface BarConfig extends ChartConfig {
  /**
   * 用来创建条形图的配置
   */
  bar: Shape;
}

export interface FunnelConfig extends ChartConfig {
  /**
   * 用来创建漏斗图的配置
   */
  funnel: Shape & { contrast?: string };
}

export interface ChartProps {
  /**
   * 显示图表的title
   */
  title?: string;
  /**
   * Chart的基础配置，设定theme, scale, tooltip
   */
  config: PropsWithChildren<ChartConfig>;
  /**
   * Chart数据
   */
  data: LooseObject[];
  loading?: boolean;
  errorTemplate?: (e: Error) => JSX.Element | JSX.Element[];
  noData?: () => JSX.Element;
  /**
   * 图例数组，是字符串或者图例对象
   *
   */
  legends?: (Legend | string)[];
}

export interface TinyChartProps extends Omit<ChartProps, 'data'> {
  data: number[];
}

export interface AdjustOpt extends Omit<AdjustOption, 'type'> {
  type: AdjustType | string;
  marginRatio?: number;
  dodgeBy?: string;
}

export type AdjustOtptionType = string | string[] | AdjustOption | AdjustOption[];

// this is used to resolve the {type: AdjustType | string} issue
export type AdjustOptType = string | string[] | AdjustOpt | AdjustOpt[];

export interface Shape extends LooseObject {
  position: string;
  /**
   * 设置数据调整方式
   * 参考: https://g2.antv.vision/zh/docs/api/general/adjust
   * @param {AdjustOption}
   */
  adjust?: AdjustOptType;
  /**
   * 颜色通道
   */
  color: string;
}

export interface ReportThing {
  elements?: Element[];
  scale?: Scale;
}

export interface CustomInfo {
  isStack?: boolean;
  topData?: LooseObject;
  chartType?: string;
  useDash?: boolean;
  type?: string;
  dodgeBy?: string;
  contrastDodge?: boolean;
  legendObject?: Legend;
  defaultStyles?: ShapeStyle;
  xField?: string;
  yField?: string;
  zField?: string;
}
