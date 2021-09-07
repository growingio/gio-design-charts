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

describe('Area Chart', () => {
  test('render Chart', async () => {
    render(<ColumnChart {...ColumnWithOne.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart with timestamp', async () => {
    render(<ColumnChart {...ColumnWithTs.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart with multi columns', async () => {
    render(<ColumnChart {...ColumnWithMulti.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart with componsive', async () => {
    render(<ColumnChart {...ColumnWithComponsive.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart with group', async () => {
    render(<ColumnChart {...ColumnWithGroup.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart with stack', async () => {
    render(<ColumnChart {...StackingDiagramColumn.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart with percent column', async () => {
    render(<ColumnChart {...PercentColumn.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Scroll Chart with stacking diagram', async () => {
    render(<ScrollColumnChart {...StackingDiagramColumn.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Scroll Chart', async () => {
    render(<ScrollColumnChart {...ColumnWithMulti.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });
});
