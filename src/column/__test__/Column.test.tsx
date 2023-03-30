import React from 'react';
import { render, screen } from '@testing-library/react';
import Column, { ColumnProps } from '../Column';
import ScrollColumn from '../ScrollColumn';
import {
  ColumnWithComponsive,
  ColumnWithGroup,
  ColumnWithMulti,
  ColumnWithTs,
  PercentColumn,
  StackingDiagramColumn,
} from '../demos/Column.stories';

const legendTestId = 'legend-layout';
describe('Column Chart', () => {
  test('render Chart with timestamp', async () => {
    render(<Column {...(ColumnWithTs.args as ColumnProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with multi columns', async () => {
    render(<Column {...(ColumnWithMulti.args as ColumnProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with componsive', async () => {
    render(<Column {...(ColumnWithComponsive.args as ColumnProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with group', async () => {
    render(<Column {...(ColumnWithGroup.args as ColumnProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with stack', async () => {
    render(<Column {...(StackingDiagramColumn.args as ColumnProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with percent column', async () => {
    render(<Column {...(PercentColumn.args as ColumnProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with Dash column', async () => {
    render(<Column {...(ColumnWithComponsive.args as ColumnProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});

describe('Column Chart with special cases', () => {
  test('render Column Chart without legends', async () => {
    const { legends, ...others } = PercentColumn.args as ColumnProps;
    render(<Column {...(others as ColumnProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Column Chart without config', async () => {
    const { config, ...others } = PercentColumn.args as ColumnProps;
    render(<Column {...(others as ColumnProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
// describe('Scroll Column Chart', () => {
//   // test('render Scroll Chart with stacking diagram', async () => {
//   //   render(<ScrollColumn {...(StackingDiagramColumn.args as ColumnProps)} />);
//   //   expect(await screen.findByTestId(legendTestId)).toBeTruthy();
//   // });

//   test('render Scroll Chart', async () => {
//     render(<ScrollColumn {...(ColumnWithMulti.args as ColumnProps)} />);
//     expect(await screen.findByTestId(legendTestId)).toBeTruthy();
//   });
// });
