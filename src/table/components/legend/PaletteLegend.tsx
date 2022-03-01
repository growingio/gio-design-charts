import { usePrefixCls } from '@gio-design/utils';
import './index.less'
export type PaletteColor = React.CSSProperties['backgroundColor']
export interface PaletteLegendProps {
  colors?: PaletteColor[];
  left?: string;
  right?: string
}
export const PaletteLegend = (props: PaletteLegendProps) => {
  const { colors = [], left = '-', right = '+' } = props;
  const clsPrefix = usePrefixCls('d-table-legend')
  return (
    <div className={`${clsPrefix}`}>
      <div className={`${clsPrefix}-limit`}>{left}</div>
      {colors.map((color, index) => (
        <span
          key={`legend-${index}`}
          className={`${clsPrefix}-color`}
          style={{ background: color }}
        />
      ))}
      <div className={`${clsPrefix}-limit`}>{right}</div>
    </div>
  );
}