import { LooseObject } from '@antv/component';
import { useCallback, useState } from 'react';
import { ChartType, Legend, Legends } from '../interfaces';
import { colors, DEFAULT_LINEDASH } from '../theme';

export const getLegends = (type: ChartType, legendProps: Array<string | Legend>): [Legends, Legend[], boolean] => {
  const legends = {} as Legends;
  let hasDashed = false;
  const legendList = legendProps?.map((legend: string | Legend, index: number) => {
    if (typeof legend === 'string') {
      legends[legend] = {
        name: legend,
        color: colors[index % colors.length],
        active: true,
        type,
      };
      return legends[legend];
    } else {
      const { lineDash, dashed } = legend;
      const lineDashCfg = {} as LooseObject;
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
      return legends[legend.name];
    }
  });
  return [legends, legendList, hasDashed];
};

const useLegends = () => {
  const [legends, setLegends] = useState<Legends>({});
  const [hasDashed, sethasDashed] = useState<boolean>(false);
  const [legendQueue, setLegendQueue] = useState<Legend[]>([]);

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
  const setLegendAndDashed = useCallback((genLegends: Legends, queue: Legend[], has: boolean) => {
    setLegends(genLegends);
    setLegendQueue(queue);
    sethasDashed(has);
  }, []);
  return { legends, legendQueue, hasDashed, setLegends: setLegendAndDashed, updateLegends };
};

export default useLegends;
