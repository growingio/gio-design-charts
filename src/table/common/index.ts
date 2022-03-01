export * from './options'
export const TOOLTIP_PREFIX_CLS = 'd-table-tooltip';

/**
 * dataCell背景标注的颜色 [backgroudColor,textColor]
 */
export const CELL_COLOR_MAP = [
  ['#1649DF', '#FFFFFF'],// positive5
  ['#4875FB', '#FFFFFF'],// positive4
  ['#8CA9FF', '#242E59'],// positive3
  ['#BBCCFF', '#242E59'],// positive2
  ['#DEE7FF', '#242E59'],// positive1
  ['#FFFFFF', '#242E59'],// zero
  ['#FAF3B5', '#242E59'],// negative1
  ['#F7EB81', '#242E59'],// negative2
  ['#EDDD44', '#242E59'],// negative3
  ['#D5C100', '#FFFFFF'],// negative4
  ['#AE9E03', '#FFFFFF'],// negative5
]