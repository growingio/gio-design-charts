import { LooseObject } from '@antv/g-base';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import './style/drag.less';

export interface VerticalMenuProps {
  height?: number;
  width?: number;
  scale?: LooseObject;
  formatter?: (text: string) => string | void;
  acceptor: any;
  sizeAcceptor: any;
  color?: string;
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
    /* istanbul ignore next */
    return [];
  }
};

const VerticalMenu = React.memo((props: VerticalMenuProps) => {
  const { acceptor, sizeAcceptor, formatter, color } = props;
  const [height, setHeight] = useState(100);
  const [ranges, setRanges] = useState<number[]>([]);
  const [ticks, setTicks] = useState<string[]>([]);
  useEffect(() => {
    acceptor((d: any) => {
      const { max, range } = d?.scale || ({} as any);
      setRanges(getRanges(max, range));
      // should clone the ticks to resolve the order will be reverted when update.
      setTicks(cloneDeep(d?.scale?.ticks)?.reverse() || []);
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
        const label = formatter?.(tick) || tick;
        return (
          <div
            className="vertical-menu-item"
            key={tick}
            title={label}
            style={{ top: ranges[index] * height - 10, color }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
});

export default VerticalMenu;
