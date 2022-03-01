/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties, FC, ReactNode, useCallback } from 'react';
import cx from 'classnames';
import { S2DataConfig, S2Options, SpreadSheet } from '@antv/s2';

import './index.less';
import { usePrefixCls } from '@gio-design/utils';
import { PaletteLegend, PaletteLegendProps } from '../legend';
import { CELL_COLOR_MAP } from '../../common';
import DataTableHeader from './Header'
export interface HeaderConfigProps {
  legendConfig?: PaletteLegendProps & { open: boolean }
}
export interface HeaderProps extends HeaderConfigProps {
  dataCfg?: S2DataConfig;
  options?: S2Options;
  sheet: SpreadSheet;
  className?: string;
  title?: string | React.ReactNode;
  description?: ReactNode;
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  width?: CSSProperties['width']
}

export const Header: FC<HeaderProps> = ({
  className,
  title,
  width,
  description,
  sheet,
  extra,
  dataCfg,
  options,
  legendConfig,
  ...restProps
}) => {

  const headerPrefixCls = usePrefixCls('d-table-header');
  /**
   * 包含背景标注时 展示legend
   * @returns boolean
   */
  const shouldShowPaletteLegend = () => {
    const conditions = sheet?.options.conditions;
    return !!conditions?.background;
  }
  const renderLegend = useCallback(() => {
    if (legendConfig?.open === false || !shouldShowPaletteLegend()) {
      return null;
    }
    const defaultColors = CELL_COLOR_MAP.map(a => a[0]);
    const colors = legendConfig?.colors || defaultColors
    return (
      <PaletteLegend colors={colors} left="-" right='+' />
    )
  }, [legendConfig])

  const getExtraComponents = () => {
    return (
      <>
        {extra}
        {renderLegend()}
      </>
    );
  };

  return (
    <DataTableHeader
      className={cx(headerPrefixCls, className)}
      style={{ width }}
      title={title}
      extra={getExtraComponents()}
      {...restProps}
    >
      {description}
    </DataTableHeader>
  );
};

