import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Funnel, { FunnelProps } from '../Funnel';
import GroupedFunnel from '../GroupedFunnel';
import {
  FunnelWith3Columns,
  FunnelWith6Columns,
  FunnelWith7Columns,
  FunnelWithBasic,
  FunnelWithGroup,
} from '../demos/Funnel.stories';

describe('Funnel Chart', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const legendTestId = 'legend-layout';

  test('render Chart', async () => {
    render(<Funnel {...(FunnelWithBasic.args as FunnelProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with 3 columns', async () => {
    render(<Funnel {...(FunnelWith3Columns.args as FunnelProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart without legends', async () => {
    render(<Funnel {...(FunnelWith3Columns.args as FunnelProps)} legends={['Test']} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with 6 columns', async () => {
    render(<Funnel {...(FunnelWith6Columns.args as FunnelProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with 7 columns', async () => {
    render(<Funnel {...(FunnelWith7Columns.args as FunnelProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with group by scrolling', async () => {
    render(<GroupedFunnel {...(FunnelWithGroup.args as FunnelProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId('scroll-x-layout')).toBeTruthy();
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  // test('render Chart with empty config and legends', async () => {
  //   render(
  //     <Funnel {...(FunnelWith7Columns.args as FunnelProps)} legends={undefined as any} config={undefined as any} />
  //   );
  //   act(() => {
  //     jest.runOnlyPendingTimers();
  //   });
  //   expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  // });

  // test('render Chart with  empty config and legends by scrolling', async () => {
  //   render(
  //     <GroupedFunnel {...(FunnelWithGroup.args as FunnelProps)} legends={undefined as any} config={undefined as any} />
  //   );
  //   act(() => {
  //     jest.runOnlyPendingTimers();
  //   });
  //   expect(await screen.findByTestId('scroll-x-layout')).toBeTruthy();
  //   expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  // });
});
