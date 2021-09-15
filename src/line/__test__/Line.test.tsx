import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChart from '../LineChart';
import { LineWithDash, LineWithMenu, LineWithOneLine } from '../demos/Line.stories';
import { ChartProps } from '../..';

describe('Line Chart', () => {
  const legendTestId = 'legend-layout';
  test('render Chart', async () => {
    render(<LineChart {...(LineWithOneLine.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with dash', async () => {
    render(<LineChart {...(LineWithDash.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with multi menus', async () => {
    render(<LineChart {...(LineWithMenu.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with empty legends', async () => {
    const { legends, ...props } = LineWithMenu.args as ChartProps;
    render(<LineChart {...(props as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
