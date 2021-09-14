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
import { ChartProps } from '../..';

describe('Funnel Chart', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const legendTestId = 'legend-director';

  test('render Chart for starting', async () => {
    render(<FunnelChart {...(FunnelWithLink.args as ChartProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart', async () => {
    render(<FunnelChart {...(FunnelWithBasic.args as ChartProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with 3 columns', async () => {
    render(<FunnelChart {...(FunnelWith3Columns.args as ChartProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with 6 columns', async () => {
    render(<FunnelChart {...(FunnelWith6Columns.args as ChartProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with 7 columns', async () => {
    render(<FunnelChart {...(FunnelWith7Columns.args as ChartProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with group by scrolling', async () => {
    render(<FunnelGroupChart {...(FunnelWithGroup.args as ChartProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId('scroll-x-director')).toBeTruthy();
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with empty config and legends', async () => {
    render(
      <FunnelChart {...(FunnelWith7Columns.args as ChartProps)} legends={undefined as any} config={undefined as any} />
    );
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with  empty config and legends by scrolling ', async () => {
    render(
      <FunnelGroupChart
        {...(FunnelWithGroup.args as ChartProps)}
        legends={undefined as any}
        config={undefined as any}
      />
    );
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId('scroll-x-director')).toBeTruthy();
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
