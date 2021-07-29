import React from "react";
import { useCallback } from "react";
import { DISABLE_COLOR } from "../../../interface";

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
  const { active, color, lineDash, type } = data || {};
  let styles = {} as React.CSSProperties;
  styles = lineDash
    ? {
        border: `1px dashed ${active ? color : DISABLE_COLOR}`,
        height: 0,
        width: 12,
      }
    : { backgroundColor: active ? color : DISABLE_COLOR };

  return (
    <span
      className="legend-label"
      onClick={onClickLabel}
      style={{ color: active ? "" : DISABLE_COLOR }}
      title={label}
    >
      <div
        className={`legend-label-block legend-label-block-${type}`}
        style={styles}
      />
      <div className="legend-label-text">{label}</div>
    </span>
  );
};

export default Legend;
