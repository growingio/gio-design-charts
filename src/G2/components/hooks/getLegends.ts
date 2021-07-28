import { Chart } from "@antv/g2";
import { useCallback, useState } from "react";
import { colors, ILegend, ILegends } from "../../interface";

const getLegends = (
  type: "line" | "bar",
  legendProps: Array<string | ILegend>
): ILegends => {
  const legends = {} as ILegends;
  legendProps.map((legend: string | ILegend, index: number) => {
    if (typeof legend === "string") {
      legends[legend] = {
        name: legend,
        color: colors[index % colors.length],
        active: true,
        type,
      };
    } else {
      legends[legend.name] = {
        ...legend,
        color: legend.color || colors[index % colors.length],
        active: true,
        type,
      };
    }
  });
  return legends;
};

export const useLegends = () => {
  const [legends, setLegends] = useState({} as ILegends);
  const updateLegends = useCallback(
    (label: string) => {
      const newLegends = {
        ...legends,
        [label]: { ...legends?.[label], active: !legends?.[label]?.active },
      };
      setLegends(newLegends);
      return newLegends;
    },
    [legends]
  );
  return { legends, setLegends, updateLegends };
};

export default getLegends;
