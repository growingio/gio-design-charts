import { LooseObject } from '@antv/component';
import DataSet from '@antv/data-set';
import { ChartConfig } from '../interfaces';
import { DEFAULT_APPEND_PADDING } from '../theme';
import { hasDodge, hasStack } from './interval';

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
  return height + fixedHeight;
};

export const calculateColumnWidth = (config: ChartConfig, data: LooseObject[]) => {
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  const configType = config?.type;
  const shapeConfig = config?.[configType];
  const color = shapeConfig?.color;

  const positionFirst = shapeConfig?.position?.split('*')?.[0];
  const isStack = hasStack(shapeConfig);
  const isDodge = hasDodge(shapeConfig);

  const intervalPadding = 40;
  const dodgePadding = 4;
  const columnWidth = 40;
  const fixedWidth = 8;

  dv.transform({
    type: 'aggregate',
    fields: [color],
    operations: ['count'],
    as: ['totalCount'],
    ...(isStack || isDodge ? { groupBy: [isStack ? positionFirst : color] } : {}),
  });
  let width = 0;
  dv.rows.forEach((row: LooseObject) => {
    const { totalCount } = row;
    if (isStack) {
      width += columnWidth;
      width += intervalPadding;
    } else if (isDodge) {
      width += columnWidth * totalCount;
      width += dodgePadding * totalCount;
      width += intervalPadding;
    } else {
      // dv.rows只有一条，根据条数计算高度，间距为intervalPadding，宽度为columnWidth
      width += intervalPadding * totalCount;
      width += columnWidth * totalCount;
    }
  });
  return width + fixedWidth;
};
