import React from 'react';
import { render, screen } from '@testing-library/react';
import ColumnChart from '../ColumnChart';
import ScrollColumnChart from '../ScrollColumnChart';
import {
  ColumnWithComponsive,
  ColumnWithGroup,
  ColumnWithMulti,
  ColumnWithOne,
  ColumnWithTs,
  PercentColumn,
  StackingDiagramColumn,
} from '../demos/Column.stories';
import { ChartProps } from '../..';

const legendTestId = 'legend-layout';
describe('Column Chart', () => {
  test('render Chart', async () => {
    render(<ColumnChart {...(ColumnWithOne.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with timestamp', async () => {
    render(<ColumnChart {...(ColumnWithTs.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with multi columns', async () => {
    render(<ColumnChart {...(ColumnWithMulti.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with componsive', async () => {
    render(<ColumnChart {...(ColumnWithComponsive.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with group', async () => {
    render(<ColumnChart {...(ColumnWithGroup.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with stack', async () => {
    render(<ColumnChart {...(StackingDiagramColumn.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with percent column', async () => {
    render(<ColumnChart {...(PercentColumn.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});

describe('Column Chart with special cases', () => {
  test('render Column Chart without legends', async () => {
    const { legends, ...others } = PercentColumn.args as ChartProps;
    render(<ColumnChart {...(others as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Column Chart without config', async () => {
    const { config, ...others } = PercentColumn.args as ChartProps;
    render(<ColumnChart {...(others as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
describe('Scroll Column Chart', () => {
  test('render Scroll Chart with stacking diagram', async () => {
    render(<ScrollColumnChart {...(StackingDiagramColumn.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Scroll Chart', async () => {
    render(<ScrollColumnChart {...(ColumnWithMulti.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
