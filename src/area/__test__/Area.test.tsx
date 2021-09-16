import React from 'react';
import { render, screen } from '@testing-library/react';
import Area from '../Area';
import { AreaStack, PercentArea } from '../demos/Area.stories';
import { ChartProps } from '../..';

describe('Area Chart', () => {
  const testid = 'legend-layout';

  test('render Stack Chart', async () => {
    render(<Area {...(AreaStack.args as ChartProps)} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });

  test('render Percent Chart', async () => {
    render(<Area {...(PercentArea.args as ChartProps)} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });

  test('render Chart with empty legends', async () => {
    const { legends, ...props } = PercentArea.args as ChartProps;
    render(<Area {...(props as ChartProps)} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });
});
