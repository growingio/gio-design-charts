import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import Legend from "./Legend";
import LegendMenu from "./Menu";

import "./styles/index.css";
import { ILegend } from "../../../interface";

const Legends = (props: any) => {
  const { legends, onClick } = props;

  const [tiled, setTiled] = useState([] as ILegend[]);
  const [grouped, setGrouped] = useState([] as ILegend[]);
  const [enableClick, setEnableClick] = useState(true);

  const onClickLegend = useCallback(
    (label: string) => {
      enableClick && onClick(label);
    },
    [onClick, enableClick]
  );

  useEffect(() => {
    const legendValues: ILegend[] = Object.values(legends) || [];
    if (legendValues.length <= 1) {
      setEnableClick(false);
    } else {
      setEnableClick(true);
    }
    if (legendValues && legendValues.length > 5) {
      setTiled(legendValues.slice(0, 5));
      setGrouped(legendValues.slice(5));
    } else {
      setTiled(legendValues);
    }
  }, [legends]);
  return (
    <div className="gio-chart-legend legend">
      {tiled?.map((legend: ILegend) => {
        const { name } = legend;
        return (
          <Legend
            key={name}
            label={name}
            data={legend}
            onClick={onClickLegend}
          />
        );
      })}
      {grouped && grouped.length > 0 && (
        <LegendMenu legends={grouped} onClick={onClickLegend} />
      )}
    </div>
  );
};

export default Legends;
