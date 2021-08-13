import React from 'react';
import { useCallback } from 'react';
import { DISABLE_COLOR } from '../../theme';
import { getBackgroundImage } from '../utils/styles';

export interface ILegendProps {
  label: string;
  data: any;
  onClick?: any;
}

const Legend = (props: ILegendProps) => {
  const { label, data, onClick } = props;
  const onClickLabel = useCallback(() => {
    onClick && onClick(label);
  }, [label, onClick]);
  const { active, color, lineDash, type, dashed } = data || {};
  let stylesLine = {} as React.CSSProperties;

  const backgroundImage = dashed ? getBackgroundImage() : {};
  stylesLine = lineDash
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
    >
      <div className={`gio-d-chart-legends_block gio-d-chart-legends_${type as 'bar' | 'line'}`} style={stylesLine} />
      <div className="gio-d-chart-legends_text">{label}</div>
    </span>
  );
};

export default Legend;
