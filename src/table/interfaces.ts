import {
  S2DataConfig,
  S2Options,
  CellScrollPosition,
  TargetCellInfo,
  LayoutCol,
  LayoutRow,
  S2Constructor,
  Node,
  SpreadSheet,
  ThemeCfg,
  ViewMeta,
  LayoutResult,
  SortParams,
} from '@antv/s2';
/**
 * 表格类型: 透视表｜明细表
 */
export type SheetType = 'pivot' | 'table';

/**
 * 自适应宽高配置
 */
export type Adaptive =
  | boolean
  | {
    width?: boolean;
    height?: boolean;
    getContainer?: () => HTMLElement;
  };
export type CellEventCallback = (data: TargetCellInfo) => void;

export interface BaseSheetEventsProps {
  onLoad?: () => void;
  onDestroy?: () => void;
  onSortChange?: (params: SortParams) => void;
  onRowColLayout?: (rows: LayoutRow[], cols: LayoutCol[]) => void;
  onAfterHeaderLayout?: (layoutResult: LayoutResult) => void;
  onCollapseRows?: (collapsedRows: Record<string, boolean>) => void;
  onCollapseRowsAll?: (hierarchyCollapse: boolean) => void;
  onCellScroll?: (position: CellScrollPosition) => void;
  onRowCellClick?: CellEventCallback;
  onRowCellDoubleClick?: CellEventCallback;
  onColCellClick?: CellEventCallback;
  onColCellDoubleClick?: CellEventCallback;
  onCornerCellClick?: CellEventCallback;
  onDataCellClick?: CellEventCallback;
  onDataCellDoubleClick?: CellEventCallback;
  onDataCellMouseUp?: CellEventCallback;
  onDataCellTrendIconClick?: (meta: ViewMeta) => void;
  onMergedCellClick?: CellEventCallback;
  onMergedCellsDoubleClick?: CellEventCallback;
  onContextMenu?: CellEventCallback;
  onRowCellHover?: CellEventCallback;
  onColCellHover?: CellEventCallback;
  onDataCellHover?: CellEventCallback;
  onMergedCellHover?: CellEventCallback;
  onCornerCellDoubleClick?: CellEventCallback;
  onCornerCellHover?: CellEventCallback;

}
export interface BaseSheetProps extends BaseSheetEventsProps {
  spreadsheet?: (...args: S2Constructor) => SpreadSheet;
  dataConfig: S2DataConfig;
  options: S2Options;
  loading?: boolean;
  // partDrillDown?: PartDrillDown;
  /**
   * 是否开启自适应宽高，并指定容器,如果为true时，按照内部的container 自适应宽高。可以对宽高分别设置
   */
  adaptive?: Adaptive;

  themeConfig?: ThemeCfg;
  prefixCls?: string;
  // header?: HeaderCfgProps;
  empty?: () => JSX.Element;
}
export interface SheetProps extends BaseSheetProps {
  type?: SheetType;
}