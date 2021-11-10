import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Gauge, { GaugeProps } from '../Gauge';
import { Basic, Dark } from '../demos/Gauge.stories';

describe('Gauge Chart', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const legendTestId = 'legend-layout';

  test('render Chart', async () => {
    render(<Gauge {...(Basic.args as GaugeProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart width dark theme', async () => {
    render(<Gauge {...(Dark.args as GaugeProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
