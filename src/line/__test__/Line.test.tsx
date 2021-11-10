import React from 'react';
import { render, screen } from '@testing-library/react';
import Line, { LineProps } from '../Line';
import { BaiscLine, MultiLine, LineWithOneLineDate, ContrastLineExample } from '../demos/Line.stories';
import ContrastLine from '../ContrastLine';

describe('Line Chart', () => {
  const legendTestId = 'legend-layout';
  test('render Chart', async () => {
    render(<Line {...(BaiscLine.args as LineProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with dash', async () => {
    render(<ContrastLine {...(ContrastLineExample.args as LineProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with multi menus', async () => {
    render(<Line {...(MultiLine.args as LineProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with empty legends', async () => {
    const { legends, ...props } = LineWithOneLineDate.args as LineProps;
    render(<Line {...(props as LineProps)} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
