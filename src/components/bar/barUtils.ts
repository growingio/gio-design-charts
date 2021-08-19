import DataSet from '@antv/data-set';
import { ChartConfig } from '../../interface';
import { hasDodge, hasStack } from '../column/settings';

export const calculate = (config: ChartConfig, data: any[]) => {
  const ds = new DataSet();
  const dv = ds.createView().source(data);

  const shapeConfig = config?.[config?.type] || {};
  const color = shapeConfig?.color;

  const positionFirst = shapeConfig?.position?.split('*')?.[0];
  const isStack = hasStack(shapeConfig);
  const isDodge = hasDodge(shapeConfig);

  const intervalPadding = 20;
  const dodgePadding = 4;
  const columnWidth = 16;

  dv.transform({
    type: 'aggregate',
    fields: [color],
    operations: ['count'],
    as: ['totalCount'],
    ...(isStack || isDodge ? { groupBy: [isStack ? positionFirst : color] } : {}),
  });
  let height = 0;
  dv.rows.map((row: any, index: number) => {
    const { totalCount = 0 } = row;
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
  return height;
};
