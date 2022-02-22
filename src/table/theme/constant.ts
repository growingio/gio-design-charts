import { Palette } from '@antv/s2'
import { paletteColorful } from './palette/colorful';
import { paletteDefault } from './palette/default';
import { paletteGray } from './palette/gray';


export const PALETTE_MAP: Record<string, Palette> = {
  default: paletteDefault,
  colorful: paletteColorful,
  gray: paletteGray,
};

export const FONT_FAMILY = "'PingFang SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei', Lato, sans-serif"

export const MINI_BAR_CHART_HEIGHT = 12;