import { LooseObject } from '@antv/g-base';
import { Scale } from '@antv/scale';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import './style/drag.less';

export interface VerticalMenuProps {
  height?: number;
  width?: number;
  scale?: LooseObject;
  acceptor: any;
  sizeAcceptor: any;
}

const getRanges = (max: number, range: number[] = [0, 0]) => {
  try {
    const duration = (range[1] - range[0]) / max;
    const ranges = [range[0]];
    ranges.length = max + 1;
    for (let i = 1; i <= max; i++) {
      ranges[i] = ranges[i - 1] + duration;
    }
    return ranges;
  } catch (err) {
    return [];
  }
};

const VerticalMenu = React.memo((props: VerticalMenuProps) => {
  const { acceptor, sizeAcceptor } = props;
  const [scale, setScale] = useState<Scale>();
  const [height, setHeight] = useState(100);
  const { max, range } = scale || ({} as any);
  const ranges = getRanges(max, range);
  // should clone the ticks to resolve the order will be reverted when update.
  const ticks = cloneDeep(scale?.ticks)?.reverse() || [];

  useEffect(() => {
    acceptor((d: any) => {
      setScale(d?.scale);
    });
  }, [acceptor]);

  useEffect(() => {
    sizeAcceptor(({ height: chartHeight }: { height: number }) => {
      // the 16px is the padding size
      chartHeight && setHeight(chartHeight);
    });
  }, [sizeAcceptor]);
  return (
    <div data-testid="vertical-menu" style={{ height, width: '100%', position: 'absolute' }}>
      {ticks?.map((tick: string, index: number) => {
        return (
          <div className="vertical-menu-item" key={tick} title={tick} style={{ top: ranges[index] * height - 10 }}>
            {tick}
          </div>
        );
      })}
    </div>
  );
});

export default VerticalMenu;
