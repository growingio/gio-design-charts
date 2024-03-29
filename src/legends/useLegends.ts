import { LooseObject } from '@antv/component';
import { forEach } from 'lodash';
import { ChartConfig, ChartType, Legend, Legends } from '../interfaces';
import { colors, DEFAULT_LINE_DASH } from '../theme';

// export const getLegends = (type: ChartType, legendProps: Array<string | Legend>): [Legends, Legend[], boolean] => {
//   const legends = {} as Legends;
//   let hasDashed = false;
//   const legendList = legendProps?.map((legend: string | Legend, index: number) => {
//     if (typeof legend === 'string') {
//       legends[legend] = {
//         name: legend,
//         color: colors[index % colors.length],
//         active: true,
//         type,
//       };
//       return legends[legend];
//     } else {
//       const { lineDash, dashed } = legend;
//       const lineDashCfg = {} as LooseObject;
//       if (lineDash === true) {
//         lineDashCfg.lineDash = DEFAULT_LINE_DASH;
//       } else if (lineDash) {
//         lineDashCfg.lineDash = lineDash;
//       }
//       if (dashed) {
//         hasDashed = true;
//       }
//       legends[legend.name] = {
//         ...legend,
//         color: legend.color || colors[index % colors.length],
//         active: true,
//         type,
//         ...lineDashCfg,
//       };
//       return legends[legend.name];
//     }
//   });
//   return [legends, legendList, hasDashed];
// };

// const useLegends = () => {
//   const [legends, setLegends] = useState<Legends>({});
//   const [hasDashed, sethasDashed] = useState<boolean>(false);
//   const [legendQueue, setLegendQueue] = useState<Legend[]>([]);

//   const updateLegends = useCallback(
//     (label: string) => {
//       const newLegends = {
//         ...legends,
//         [label]: { ...legends?.[label], active: !legends?.[label]?.active },
//       };
//       const newQueue = legendQueue.map((le) => (le.name === label ? newLegends[label] : le));
//       setLegends(newLegends);
//       setLegendQueue(newQueue);
//       return newLegends;
//     },
//     [legends, legendQueue]
//   );
//   const setLegendAndDashed = useCallback((genLegends: Legends, queue: Legend[], has: boolean) => {
//     setLegends(genLegends);
//     setLegendQueue(queue);
//     sethasDashed(has);
//   }, []);
//   return { legends, legendQueue, hasDashed, setLegends: setLegendAndDashed, updateLegends };
// };

// export default useLegends;

export class LegendObject {
  // Each chart show have the only legend object
  source: (Legend | string)[] = [];
  // Transform source to legend object and store in quene
  queue: Legend[] = [];
  // {key: Legend} mapping is used for query
  mapping: { [key: string]: Legend } = {};
  // whether there is dashed series
  hasDashed: boolean = false;
  // whether support legend
  support: boolean = true;

  updated: number = 1;

  constructor(config: ChartConfig, source: (Legend | string)[]) {
    this.source = source;
    this.queue = [];
    this.mapping = {};
    this.hasDashed = false;
    this.setLegends(config, source);
  }

  setLegends = (config: ChartConfig, source: (Legend | string)[]) => {
    this.source = source;
    this.transform(config.type);
    this.support = config?.legend !== false && this.source?.length > 0;
  };

  getLegend = (label: string): Legend => this?.mapping?.[label] || ({} as Legend);

  // transform source to queue and mapping
  transform = (type: ChartType) => {
    const legends = {} as Legends;
    let hasDashed = false;
    this.queue = this.source?.map((legend: string | Legend, index: number) => {
      if (typeof legend === 'string') {
        legends[legend] = {
          name: legend,
          color: colors[index % colors.length],
          active: true,
          type,
        };
        return legends[legend];
      } else {
        const { lineDash, dashed, type: customType } = legend;
        const lineDashCfg = {} as LooseObject;
        if (lineDash === true) {
          lineDashCfg.lineDash = DEFAULT_LINE_DASH;
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
          type: customType || type,
          ...lineDashCfg,
        };
        return legends[legend.name];
      }
    });
    this.hasDashed = hasDashed;
    this.mapping = legends;
  };

  // update Legends in mapping
  update = (label: string) => {
    this.updated = new Date().getTime();
    const clickLegend = this.mapping?.[label];
    const active = !clickLegend?.active;
    const controlKey = clickLegend?.controlKey || clickLegend?.name;
    forEach(this.mapping, (legend: Legend, key: string) => {
      // 修改点击的legend的active状态，以及controlKey和当前点击的内容一致的
      if (controlKey === key || legend.controlKey === controlKey) {
        legend.active = active;
        if (legend.controlKey) {
          const controlLegend = this.mapping?.[legend.controlKey];
          controlLegend.active = active;
        }
      }
    });
    this.queue = this.queue.map((le) => (le.name === label ? this.mapping[label] : le));
    return this.mapping;
  };
}
