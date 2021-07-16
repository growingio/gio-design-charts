export const LINEDASH_1 = [2, 5];
export const LINEDASH_2 = [2, 7];

export const colors = [
  '#5F87FF',
  '#FFDD63',
  '#62CE6C',
  '#FFA455',
  '#60BCFA',
  '#CACEDB',
];

export interface ILegend {
  active: boolean;
  name: string;
  color: string;
  lineDash?: Array<number>;
}

export interface ILegends {
  [name: string]: ILegend;
}
