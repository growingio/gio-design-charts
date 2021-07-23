import React from "react";
import { useCallback } from "react";
import Legend from "./Legend";

const Legends = (props: any) => {
  const { legends, onClick } = props;
  const onClickLegend = useCallback(
    (label: string) => {
      onClick(label);
    },
    [onClick]
  );
  return (
    <div className="legend">
      {Object.keys(legends).map((label: string, index: number) => {
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
    </div>
  );
};

export default Legends;
