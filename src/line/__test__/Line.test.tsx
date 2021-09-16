import React from 'react';
import { render, screen } from '@testing-library/react';
import Line from '../Line';
import { BaiscLine, ContrastLine, MultiLine, LineWithOneLineDate } from '../demos/Line.stories';
import { ChartProps } from '../..';

describe('Line Chart', () => {
  const legendTestId = 'legend-layout';
  test('render Chart', async () => {
    render(<Line {...(BaiscLine.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with dash', async () => {
    render(<Line {...(ContrastLine.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with multi menus', async () => {
    render(<Line {...(MultiLine.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with empty legends', async () => {
    const { legends, ...props } = LineWithOneLineDate.args as ChartProps;
    render(<Line {...(props as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
