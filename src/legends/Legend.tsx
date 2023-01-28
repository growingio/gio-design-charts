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
  const { label, alias, data, onClick, textColor, } = props;
  const onClickLabel = useCallback(() => {
    onClick && onClick(label);
  }, [label, onClick]);
  const { active, color, lineDash, type, dashed, width,shapeType} = data || {};

  const backgroundImage = dashed ? getBackgroundImage(type) : {};
  let stylesLine = lineDash
    ? {
        border: `1px dashed ${active ? color : DISABLE_COLOR}`,
        height: 0,
        width: 12,
        ...shapeType,
        ...(textColor ? { backgroundColor: '#000' } : {}),
        ...backgroundImage,
      }
    : { backgroundColor: active ? color : DISABLE_COLOR, ...backgroundImage };

  const textStyles = textColor ? { color: textColor } : {};
if (shapeType === 'circle') {
  stylesLine = {...stylesLine, borderRadius: '100px'}
}

  return (
    <span
      className="gio-d-charts-legends_legend"
      onClick={onClickLabel}
      style={{ color: active ? '' : DISABLE_COLOR, width }}
      title={alias || label}
      data-testid={`legend-item-${label}`}
    >
      <div className={`gio-d-charts-legends_block gio-d-charts-legends_${type as ChartType}`} style={stylesLine} />
      <div className="gio-d-charts-legends_text" style={{ ...textStyles, maxWidth: width || 125 - 40 }}>
        {alias || label}
      </div>
    </span>
  );
};

export default Legend;
