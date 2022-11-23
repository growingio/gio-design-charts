import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Bubble, { BubbleProps } from '../Bubble';
import { Basic, Dark, SameSize } from '../demos/Bubble.stories';

describe('Bubble Chart', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const legendTestId = 'legend-layout';

  test('render Chart', async () => {
    render(<Bubble {...(Basic.args as BubbleProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with same size', async () => {
    render(<Bubble {...(SameSize.args as BubbleProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with number size', async () => {
    const { size, ...withoutSizeBubbleCfg } = (SameSize.args as BubbleProps).config.bubble;
    SameSize.args = {
      ...SameSize.args,
      config: {
        ...(SameSize.args as BubbleProps).config,
        bubble: { ...withoutSizeBubbleCfg, size: 10 },
      },
    };
    render(<Bubble {...(SameSize.args as BubbleProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with array size', async () => {
    const { size, ...withoutSizeBubbleCfg } = (SameSize.args as BubbleProps).config.bubble;
    SameSize.args = {
      ...SameSize.args,
      config: {
        ...(SameSize.args as BubbleProps).config,
        bubble: { ...withoutSizeBubbleCfg, size: [10, 60] },
      },
    };
    render(<Bubble {...(SameSize.args as BubbleProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart width dark theme', async () => {
    render(<Bubble {...(Dark.args as BubbleProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
