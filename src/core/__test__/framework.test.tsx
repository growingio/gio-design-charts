import React, { RefObject } from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';

import { PercentArea } from '../../area/demos/Area.stories';
import { ChartProps } from '../../interfaces';
import { AreaChart } from '../..';

export const chartComponentTestid = 'chart-component';
export const ChartCom = () => {
  const rootRef: RefObject<HTMLDivElement> = React.createRef();
  return <div ref={rootRef} data-testid={chartComponentTestid} />;
};

describe('common', () => {
  test('default', () => {
    render(<AreaChart {...(PercentArea.args as ChartProps)} />);

    const testid = 'legend-item-Facebook';
    const legend = screen.getByTestId(testid);
    expect(legend).toBeTruthy();

    const clickLegendEvent = createEvent.click(legend);
    fireEvent(legend, clickLegendEvent);
  });
});
