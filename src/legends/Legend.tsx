import React, { useCallback } from 'react';
import { LooseObject } from '@antv/component';
import { ChartType } from '../interfaces';
import { DISABLE_COLOR } from '../theme';
import { getBackgroundImage } from '../utils/styles';

export interface LegendProps {
  label: string;
  data: LooseObject;
  onClick?: (label: string) => void;
}

const Legend = (props: LegendProps) => {
  const { label, data, onClick } = props;
  const onClickLabel = useCallback(() => {
    onClick && onClick(label);
  }, [label, onClick]);
  const { active, color, lineDash, type, dashed } = data || {};

  const backgroundImage = dashed ? getBackgroundImage(type) : {};
  const stylesLine = lineDash
    ? {
        border: `1px dashed ${active ? color : DISABLE_COLOR}`,
        height: 0,
        width: 12,
        ...backgroundImage,
      }
    : { backgroundColor: active ? color : DISABLE_COLOR, ...backgroundImage };

  return (
    <span
      className="gio-d-chart-legends_legend"
      onClick={onClickLabel}
      style={{ color: active ? '' : DISABLE_COLOR }}
      title={label}
      data-testid={`legend-item-${label}`}
    >
      <div className={`gio-d-chart-legends_block gio-d-chart-legends_${type as ChartType}`} style={stylesLine} />
      <div className="gio-d-chart-legends_text">{label}</div>
    </span>
  );
};

export default Legend;
