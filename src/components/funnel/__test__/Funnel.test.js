import React from 'react';
import { act, render, screen } from '@testing-library/react';
import FunnelChart from '../FunnelChart';
import FunnelGroupChart from '../FunnelGroupChart';
import {
  FunnelWith3Columns,
  FunnelWith6Columns,
  FunnelWith7Columns,
  FunnelWithBasic,
  FunnelWithGroup,
  FunnelWithLink,
} from '../demos/Funnel.stories';

describe('Funnel Chart', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('render Chart for starting', async () => {
    render(<FunnelChart {...FunnelWithLink.args} />);
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart', async () => {
    render(<FunnelChart {...FunnelWithBasic.args} />);
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart with 3 columns', async () => {
    render(<FunnelChart {...FunnelWith3Columns.args} />);
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart with 6 columns', async () => {
    render(<FunnelChart {...FunnelWith6Columns.args} />);
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart with 7 columns', async () => {
    render(<FunnelChart {...FunnelWith7Columns.args} />);
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render Chart with group by scrolling', async () => {
    render(<FunnelGroupChart {...FunnelWithGroup.args} />);
    await act(async () => {
      await jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId('scroll-x-director')).toBeTruthy();
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });
});
