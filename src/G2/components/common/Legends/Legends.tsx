import React, { useState } from "react";
import { useCallback } from "react";
import Legend from "./Legend";
import LegendMenu from "./Menu";

import "./styles/index.css";

const Legends = (props: any) => {
  const { legends, onClick } = props;
  const onClickLegend = useCallback(
    (label: string) => {
      onClick(label);
    },
    [onClick]
  );
  return (
    <div className="gio-chart-legend legend">
      {Object.keys(legends).map((label: string) => {
        const legend = legends[label] || {};
        return (
          <Legend
            key={label}
            label={label}
            data={legend}
            onClick={onClickLegend}
          />
        );
      })}
      <LegendMenu legends={legends} onClick={onClickLegend} />
    </div>
  );
};

export default Legends;
