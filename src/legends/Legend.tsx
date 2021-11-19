import React, { useCallback } from 'react';
import { LooseObject } from '@antv/component';
import { ChartType } from '../interfaces';
import { DISABLE_COLOR } from '../theme';
import { getBackgroundImage } from '../utils/styles';

export interface LegendProps {
  label: string;
  alias?: string;
  data: LooseObject;
  textColor?: string;
  onClick?: (label: string) => void;
}

const Legend = (props: LegendProps) => {
  const { label, alias, data, onClick, textColor } = props;
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
        ...(textColor ? { backgroundColor: '#000' } : {}),
        ...backgroundImage,
      }
    : { backgroundColor: active ? color : DISABLE_COLOR, ...backgroundImage };

  const textStyles = textColor ? { color: textColor } : {};

  return (
    <span
      className="gio-d-charts-legends_legend"
      onClick={onClickLabel}
      style={{ color: active ? '' : DISABLE_COLOR }}
      title={label}
      data-testid={`legend-item-${label}`}
    >
      <div className={`gio-d-charts-legends_block gio-d-charts-legends_${type as ChartType}`} style={stylesLine} />
      <div className="gio-d-charts-legends_text" style={textStyles}>
        {alias || label}
      </div>
    </span>
  );
};

export default Legend;
