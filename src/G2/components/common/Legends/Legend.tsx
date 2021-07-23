import React from "react";
import { useCallback } from "react";
import { DISABLE_COLOR } from "../../../interface";

export interface ILegendProps {
  label: string;
  data: any;
  onClick?: any;
}

const Legend = (props: any) => {
  const { label, data, onClick } = props;
  const onClickLabel = useCallback(() => {
    onClick && onClick(label);
  }, [label, onClick]);
  return (
    <span
      className="legend-label"
      onClick={onClickLabel}
      style={{ color: data.active ? "" : DISABLE_COLOR }}
    >
      <div
        className="legend-label-block"
        style={{ backgroundColor: data.active ? data.color : DISABLE_COLOR }}
      />
      {label}
    </span>
  );
};

export default Legend;
