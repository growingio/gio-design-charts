import { Element, Scale } from '@antv/g2';

export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  COLUMN = 'column',
}

export interface ILegend {
  // 图表Chart的类型，可为BAR、LINE等
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
  config: any;
  data: any;
  legends: Array<ILegend | string>;
}

export interface IChartOptions {
  id: HTMLElement;
  data: any;
  legends: ILegends;
  hasDashed?: boolean;
  [key: string]: any;
}

export interface IChartConfig {
  [key: string]: any;
}

export interface IReportThing {
  elements?: Element[];
  scale?: Scale;
}
