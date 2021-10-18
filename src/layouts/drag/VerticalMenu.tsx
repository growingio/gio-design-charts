import { LooseObject } from '@antv/g-base';
import { Scale } from '@antv/scale';
import React, { useEffect, useState } from 'react';
import '../../bar/styles/bar.less';

export interface VerticalMenuProps {
  height?: number;
  width?: number;
  scale?: LooseObject;
  acceptor: any;
  heightAcceptor: any;
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
  const { acceptor, heightAcceptor } = props;
  const [scale, setScale] = useState<Scale>();
  const [height, setHeight] = useState(100);
  const { max, range } = scale || ({} as any);
  const ranges = getRanges(max, range);
  const ticks = scale?.ticks?.reverse() || [];

  useEffect(() => {
    acceptor((d: any) => {
      setScale(d?.scale);
    });
  }, [acceptor]);

  useEffect(() => {
    heightAcceptor((chartHeight: number) => {
      chartHeight && setHeight(chartHeight);
    });
  }, [heightAcceptor]);
  return (
    <div data-testid="vertical-menu" style={{ height, width: '100%', position: 'absolute' }}>
      {ticks?.map((tick: string, index: number) => {
        return (
          <div className="gio-d-chart-verticalmenu_item" key={tick} style={{ top: ranges[index] * height - 9 }}>
            {tick}
          </div>
        );
      })}
    </div>
  );
});

export default VerticalMenu;
