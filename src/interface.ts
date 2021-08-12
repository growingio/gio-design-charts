import { Element, Scale } from '@antv/g2';
import { AdjustOption } from '@antv/g2/lib/interface';

export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  COLUMN = 'column',
  FUNNEL = 'funnel',
}

export interface ILegend {
  /**
   图表Chart的类型，可为BAR、LINE等
   */
  type?: ChartType;

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
}

export interface ILegends {
  [name: string]: ILegend;
}
export interface IChartProps {
  /**
   Chart的基础配置，设定theme, scale, tooltip
   */
  config: any;
  /**
   Chart数据
   */
  data: any;
  /**
   图例数组，是字符串或者图例对象
   * 
   */
  legends: (ILegend | string)[];
}

export interface IChartOptions {
  id?: HTMLElement;
  data?: any;
  legends?: ILegends;
  hasDashed?: boolean;
  /**
   * set default styles for line or interval
   */
  defaultStyles?: any;
  [key: string]: any;
}

export interface IChartConfig {
  [key: string]: any;
  /**
   * 用来创建柱状图的配置
   */
  column?: IShape;

  /**
   * 用来创建折线图的配置
   */
  line?: IShape;

  /**
   * 用来创建条形图的配置
   */
  bar?: IShape;

  /**
   * 用来创建面积图的配置
   */
  area?: IShape;
}

export interface IShape {
  /**
   * 设置数据调整方式
   * 参考: https://g2.antv.vision/zh/docs/api/general/adjust
   * @param {AdjustOption}
   */
  adjust?: string | string[] | AdjustOption | AdjustOption[];
}

export interface IReportThing {
  elements?: Element[];
  scale?: Scale;
}
