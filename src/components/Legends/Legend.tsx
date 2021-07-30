import React from "react";
import { useCallback } from "react";
import { DISABLE_COLOR } from "../../theme";
import { getBackgroundImage } from "../utils/styles";

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
  let styles = {} as React.CSSProperties;

  const backgroundImage = dashed ? getBackgroundImage() : {};
  styles = lineDash
    ? {
        border: `1px dashed ${active ? color : DISABLE_COLOR}`,
        height: 0,
        width: 12,
        ...backgroundImage,
      }
    : { backgroundColor: active ? color : DISABLE_COLOR, ...backgroundImage };

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
