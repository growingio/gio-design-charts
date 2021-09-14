import React from 'react';

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

const VerticalMenu = React.memo((props: any) => {
  const { height, width, scale = {} } = props;
  const { max, range } = scale;
  const ranges = getRanges(max, range);
  const ticks = scale.ticks?.reverse() || [];
  return (
    <div data-testid="vertical-menu" style={{ height, width, position: 'absolute' }}>
      {/* {elements.map((element: Element, index: number) => {
        const { type: name } = element.getData();
        const { y } = element.getModel();
        return (
          <div className={styles.item} key={name} style={{ top: (y as number) - 9 }}>
            {name}
          </div>
        );
      })} */}
      {ticks.map((tick: string, index: number) => {
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
