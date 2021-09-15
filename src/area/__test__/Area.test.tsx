import React from 'react';
import { render, screen } from '@testing-library/react';
import AreaChart from '../AreaChart';
import { AreaStack, AreaWithSample, PercentArea } from '../demos/Area.stories';
import { ChartProps } from '../..';

describe('Area Chart', () => {
  const testid = 'legend-layout';

  test('render Chart', async () => {
    render(<AreaChart {...(AreaWithSample.args as ChartProps)} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });

  test('render Stack Chart', async () => {
    render(<AreaChart {...(AreaStack.args as ChartProps)} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });

  test('render Percent Chart', async () => {
    render(<AreaChart {...(PercentArea.args as ChartProps)} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });

  test('render Chart with empty legends', async () => {
    const { legends, ...props } = PercentArea.args as ChartProps;
    render(<AreaChart {...(props as ChartProps)} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });
});
