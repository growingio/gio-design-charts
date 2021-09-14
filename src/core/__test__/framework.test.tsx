import React, { RefObject } from 'react';

export const chartComponentTestid = 'chart-component';
export const ChartCom = () => {
  const rootRef: RefObject<HTMLDivElement> = React.createRef();
  return <div ref={rootRef} data-testid={chartComponentTestid} />;
};

describe('common', () => {
  test('default', () => {
    expect(1).toBe(1);
  });
});
