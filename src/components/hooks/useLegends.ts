import { useCallback, useState } from 'react';
import { ChartType, ILegend, ILegends } from '../../interface';
import { colors, DEFAULT_LINEDASH } from '../../theme';

export const getLegends = (type: ChartType, legendProps: Array<string | ILegend>): [ILegends, boolean] => {
  const legends = {} as ILegends;
  let hasDashed = false;
  legendProps?.map((legend: string | ILegend, index: number) => {
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

export default useLegends;
