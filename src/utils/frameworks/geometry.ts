import { LooseObject } from '@antv/g-base';
import { Geometry } from '@antv/g2';
import { SizeAttrCallback } from '@antv/g2/lib/interface';
import { Legends } from '../../interfaces';

export const bindPosition = (geo: Geometry, position: string) => {
  return geo.position(position);
};

export const bindSize = (geo: Geometry, sizeCfg: number | string | LooseObject | LooseObject[]) => {
  if (!sizeCfg) {
    return geo.size(4);
  }
  if (typeof sizeCfg === 'string') {
    return geo.size(sizeCfg, [4, 50]);
  }
  if (typeof sizeCfg === 'number') {
    return geo.size(sizeCfg);
  }
  if (Array.isArray(sizeCfg)) {
    return geo.size.apply(
      geo,
      sizeCfg as [field: string | number, cfg?: SizeAttrCallback | [number, number] | undefined]
    );
  }
  return geo;
};

export const bindPointColor = (geo: Geometry, color: string, legends: Legends) => {
  if (color) {
    geo.color(color);
    geo.style(color, (val) => {
      return {
        lineWidth: 1,
        strokeOpacity: 1,
        fillOpacity: 0.4,
        opacity: 1,
        fill: legends[val]?.color || '',
        stroke: legends[val]?.color || '',
      };
    });
  }
  return geo;
};

export const bindShape = (geo: Geometry, shape: string) => {
  return geo.shape(shape);
};

export const bindState = (geo: Geometry, state: LooseObject) => {
  return geo.state(state);
};
