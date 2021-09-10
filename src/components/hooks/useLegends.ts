import { useCallback, useState } from 'react';
import { ChartType, Legend, Legends } from '../../interface';
import { colors, DEFAULT_LINEDASH } from '../../theme';

export const getLegends = (type: ChartType, legendProps: Array<string | Legend>): [Legends, boolean] => {
  const legends = {} as Legends;
  let hasDashed = false;
  legendProps?.forEach((legend: string | Legend, index: number) => {
    if (typeof legend === 'string') {
      legends[legend] = {
        name: legend,
        color: colors[index % colors.length],
        active: true,
        type,
      };
    } else {
      const { lineDash, dashed } = legend;
      const lineDashCfg = {} as any;
      if (lineDash === true) {
        lineDashCfg.lineDash = DEFAULT_LINEDASH;
      } else if (lineDash) {
        lineDashCfg.lineDash = lineDash;
      }
      if (dashed) {
        hasDashed = true;
      }
      legends[legend.name] = {
        ...legend,
        color: legend.color || colors[index % colors.length],
        active: true,
        type,
        ...lineDashCfg,
      };
    }
    return legend;
  });
  return [legends, hasDashed];
};

const useLegends = () => {
  const [legends, setLegends] = useState({} as Legends);
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

export default useLegends;
