import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Donut, { DonutProps } from '../Donut';
import { Basic, Dark } from '../demos/Donut.stories';

describe('Donut Chart', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const legendTestId = 'legend-layout';

  test('render Chart', async () => {
    render(<Donut {...(Basic.args as DonutProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart width dark theme', async () => {
    render(<Donut {...(Dark.args as DonutProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
