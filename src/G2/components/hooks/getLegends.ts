import { colors, ILegend, ILegends } from '../../interface';

const getLegends = (legendProps: Array<string | ILegend>): ILegends => {
  const legends = {} as ILegends;
  legendProps.map((legend: string | ILegend, index: number) => {
    if (typeof legend === 'string') {
      legends[legend] = {
        name: legend,
        color: colors[index % colors.length],
        active: true,
      };
    } else {
      legends[legend.name] = {
        ...legend,
        color: legend.color || colors[index % colors.length],
        active: true,
      };
    }
  });
  return legends;
};

export default getLegends;
