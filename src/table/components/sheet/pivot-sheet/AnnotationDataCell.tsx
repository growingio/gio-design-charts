import type { S2CellType, ViewMeta } from '@antv/s2';
import { CustomDataCell } from './CustomDataCell';

export const AnnotationDataCell = (viewMeta: ViewMeta): S2CellType =>
  new CustomDataCell(viewMeta, viewMeta.spreadsheet);
