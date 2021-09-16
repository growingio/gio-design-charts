import React from 'react';
import { render, screen } from '@testing-library/react';
import Column from '../Column';
import ScrollColumn from '../ScrollColumn';
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
    render(<Column {...(ColumnWithOne.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with timestamp', async () => {
    render(<Column {...(ColumnWithTs.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with multi columns', async () => {
    render(<Column {...(ColumnWithMulti.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with componsive', async () => {
    render(<Column {...(ColumnWithComponsive.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with group', async () => {
    render(<Column {...(ColumnWithGroup.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with stack', async () => {
    render(<Column {...(StackingDiagramColumn.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with percent column', async () => {
    render(<Column {...(PercentColumn.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});

describe('Column Chart with special cases', () => {
  test('render Column Chart without legends', async () => {
    const { legends, ...others } = PercentColumn.args as ChartProps;
    render(<Column {...(others as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Column Chart without config', async () => {
    const { config, ...others } = PercentColumn.args as ChartProps;
    render(<Column {...(others as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
describe('Scroll Column Chart', () => {
  test('render Scroll Chart with stacking diagram', async () => {
    render(<ScrollColumn {...(StackingDiagramColumn.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Scroll Chart', async () => {
    render(<ScrollColumn {...(ColumnWithMulti.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
