import { Element, Scale } from '@antv/g2';
import { AdjustOption, ScaleOption } from '@antv/g2/lib/interface';

export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  COLUMN = 'column',
  FUNNEL = 'funnel',
  AREA = 'area',
}

export interface Legend {
  /**
   * 图表Chart的类型，可为BAR、LINE等
   */
  type?: ChartType | string;

  // 图例Legend的名称
  name: string;

  // 是否已经激活显示图例，默认为true
  active?: boolean;

  // 设置图例的颜色，默认为12中显色定义
  color?: string;

  // 柱状图的柱子是否为虚线
  dashed?: boolean;

  // 折线图的线是否为虚线，当是true，则显示默认虚线样子，若不是，请定义虚线
  // 详细设置请查看 https://g2.antv.vision/zh/docs/api/shape/shape-attrs#%E7%BA%BF%E6%9D%A1%E5%B1%9E%E6%80%A7
  lineDash?: boolean | Array<number>;

  // 声明以哪个数据字段为分组依据
  dodgeBy?: string;
}

export interface Legends {
  [name: string]: Legend;
}
export interface ChartProps {
  /**
   * Chart的基础配置，设定theme, scale, tooltip
   */
  config: any;
  /**
   * Chart数据
   */
  data: any;
  /**
   * 图例数组，是字符串或者图例对象
   *
   */
  legends: (Legend | string)[];
}

export interface ChartOptions {
  id?: HTMLElement;
  data?: any;
  legends?: Legends;
  hasDashed?: boolean;
  /**
   * set default styles for line or interval
   */
  defaultStyles?: any;
  [key: string]: any;
}

export interface ChartConfig {
  /**
   * 用来创建柱状图的配置
   */
  column?: Shape;

  /**
   * 用来创建折线图的配置
   */
  line?: Shape;

  /**
   * 用来创建条形图的配置
   */
  bar?: Shape;

  /**
   * 用来创建面积图的配置
   */
  area?: Shape;
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
  scale?: [field: string, scaleOption: ScaleOption];
  /**
   * 更多的扩展配置
   */
  [key: string]: any;
}

type AdjustOptionType = AdjustOption | AdjustOption[];

export interface Shape {
  /**
   * 设置数据调整方式
   * 参考: https://g2.antv.vision/zh/docs/api/general/adjust
   * @param {AdjustOption}
   */
  adjust?: string | string[] | AdjustOptionType;
  /**
   * 颜色通道
   */
  color?: string;
  [key: string]: any;
}

export interface ReportThing {
  elements?: Element[];
  scale?: Scale;
}
