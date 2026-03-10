import { LooseObject } from '@antv/component';
import DataSet from '@antv/data-set';
import { ChartConfig } from '../interfaces';
import { DEFAULT_APPEND_PADDING, DEFAULT_CHART_HEIGHT } from '../theme';
import { hasDodge, hasStack } from './interval';

// Minimum column width in pixels
export const DEFAULT_MIN_COLUMN_WIDTH = 8;
// Maximum column width in pixels
export const DEFAULT_MAX_COLUMN_WIDTH = 64;
// Padding between intervals (bar/column spacing)
export const DEFAULT_INTERVAL_PADDING = 8;
// Padding between dodge groups
export const DEFAULT_DODGE_PADDING = 2;
// Fixed width offset for chart calculation
export const DEFAULT_PADDING = 80;

export const calculateBarHeight = (config: ChartConfig, data: LooseObject[]) => {
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  const configType = config?.type;
  const shapeConfig = config?.[configType];
  const color = shapeConfig?.color;

  const positionFirst = shapeConfig?.position?.split('*')?.[0];
  const isStack = hasStack(shapeConfig);
  const isDodge = hasDodge(shapeConfig);

  dv.transform({
    type: 'aggregate',
    fields: [color],
    operations: ['count'],
    as: ['totalCount'],
    ...(isStack || isDodge ? { groupBy: [isStack ? positionFirst : color] } : {}),
  });

  const intervalPadding = 20;
  const dodgePadding = 8;
  const columnWidth = 16;
  const fixedHeight = 16 + DEFAULT_APPEND_PADDING * 2;
  let height = 0;
  dv.rows.forEach((row: LooseObject) => {
    const { totalCount } = row;
    if (isStack) {
      height += columnWidth;
      height += intervalPadding;
    } else if (isDodge) {
      height += totalCount * columnWidth;
      height += intervalPadding;
      height += totalCount * dodgePadding;
    } else {
      // dv.rows只有一条，根据条数计算高度，间距为intervalPadding，宽度为columnWidth
      height += (totalCount - 1) * intervalPadding;
      height += totalCount * columnWidth;
    }
  });
  const calculatedHeight = height + fixedHeight;
  return calculatedHeight < DEFAULT_CHART_HEIGHT ? DEFAULT_CHART_HEIGHT : calculatedHeight;
};

interface ColumnWidthResult {
  needScroll: boolean;
  width: number;
  columnWidth: number;
  intervalPadding: number;
  dodgePadding: number;
  columnWidthRatio?: number;
}

export const calculateColumnWidth = (config: ChartConfig, data: LooseObject[], containerWidth?: number) => {
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  const configType = config?.type;
  const shapeConfig = config?.[configType];
  const color = shapeConfig?.color;

  const positionFirst = shapeConfig?.position?.split('*')?.[0];
  const isStack = hasStack(shapeConfig);
  const isDodge = hasDodge(shapeConfig);

  const minColumnWidth = config?.customSizeConfig?.minColumnWidth || DEFAULT_MIN_COLUMN_WIDTH;
  const maxColumnWidth = config?.customSizeConfig?.maxColumnWidth || DEFAULT_MAX_COLUMN_WIDTH;
  const intervalPadding = config?.customSizeConfig?.intervalPadding || DEFAULT_INTERVAL_PADDING;
  const dodgePadding = config?.customSizeConfig?.dodgePadding || DEFAULT_DODGE_PADDING;
  const fixedWidth = DEFAULT_APPEND_PADDING;
  const extraPadding = DEFAULT_PADDING;

  dv.transform({
    type: 'aggregate',
    fields: [color],
    operations: ['count'],
    as: ['totalCount'],
    ...(isStack || isDodge ? { groupBy: [isStack ? positionFirst : color] } : {}),
  });

  const groupCount = dv.rows.length > 0 ? Math.max(...dv.rows.map((r: LooseObject) => r?.totalCount || 1)) : 1;
  const groupItemCount = dv.rows.length;

  let calculatedWidth: number;
  if (isDodge) {
    calculatedWidth = ((minColumnWidth + dodgePadding) * groupItemCount - dodgePadding + intervalPadding) * groupCount + fixedWidth + extraPadding;
  } else if (isStack) {
    calculatedWidth = (minColumnWidth + intervalPadding) * groupItemCount + fixedWidth + extraPadding;
  }else{
    calculatedWidth = (minColumnWidth + intervalPadding) * groupCount + fixedWidth + extraPadding;
  }

  if (containerWidth !== undefined && calculatedWidth > containerWidth) {
    return {
      needScroll: true,
      width: calculatedWidth,
      columnWidth: minColumnWidth,
      intervalPadding: intervalPadding,
      dodgePadding: config?.customSizeConfig?.dodgePadding || DEFAULT_DODGE_PADDING,
    };
  }

  const result: ColumnWidthResult = {
    needScroll: false,
    width: calculatedWidth,
    columnWidth: maxColumnWidth,
    intervalPadding: intervalPadding,
    dodgePadding: config?.customSizeConfig?.dodgePadding || DEFAULT_DODGE_PADDING,
  };

  if (isDodge && containerWidth !== undefined) {
    const rawRatio = ((maxColumnWidth + dodgePadding) * groupItemCount - dodgePadding) * groupCount / (containerWidth);
    result.columnWidthRatio = Math.ceil(rawRatio * 10000) / 10000;
    result.columnWidthRatio = Math.min(0.5, result.columnWidthRatio);
  }

  return result;
};
