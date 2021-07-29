import { useCallback, useState } from "react";
import { colors, ILegend, ILegends, LINEDASH_1 } from "../../interface";

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
      const { lineDash } = legend;
      const lineDashCfg = {} as any;
      if (lineDash === true) {
        lineDashCfg.lineDash = LINEDASH_1;
      } else if (lineDash) {
        lineDashCfg.lineDash = lineDash;
      }
      legends[legend.name] = {
        ...legend,
        color: legend.color || colors[index % colors.length],
        active: true,
        type,
        ...lineDashCfg,
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
