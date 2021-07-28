export const LINEDASH_1 = [2, 5];
export const LINEDASH_2 = [2, 7];

export const colors = [
  "#5F87FF",
  "#FFDD63",
  "#62CE6C",
  "#FFA455",
  "#60BCFA",
  "#DB7892",
  "#5D9BA4",
  "#FFB7AE",
  "#04A375",
  "#D770E0",
  "#7569AB",
  "#FF7955",
];

export const DEFAULT_OTERH_COLOR = "#CACEDB";
export const DISABLE_COLOR = "#ADB2C2";

export interface ILegend {
  type?: "line" | "bar";
  name: string;
  active?: boolean;
  color?: string;
  lineDash?: Array<number>;
}
export interface IChartProps {
  config: any;
  data: any;
  legends: Array<ILegend | string>;
}

export interface ILegends {
  [name: string]: ILegend;
}
