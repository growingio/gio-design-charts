import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Bubble, { BubbleProps } from '../Bubble';
import { Basic, Dark, SameSize } from '../demos/Bubble.stories';
import { Bubble as BubbleCls } from '../framework';
import { LegendLayout } from '../../layouts';
import { IntlProvider } from 'react-intl';

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

  test('render Chart width dark theme', async () => {
    render(<Bubble {...(Dark.args as BubbleProps)} />);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Bubble framework', () => {
    const bubble = new BubbleCls();
    const { legends, config, data, title } = Basic.args as BubbleProps;
    render(
      <IntlProvider locale="zh-CH" messages={{}}>
        <LegendLayout config={config} title={title} data={data} legendList={legends || []} chart={bubble} />
      </IntlProvider>
    );

    bubble.update(data);
  });
});
