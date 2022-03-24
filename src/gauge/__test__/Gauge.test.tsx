import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Gauge, { GaugeProps } from '../Gauge';
import { Basic, Dark } from '../demos/Gauge.stories';
import { ChartType } from '../../interfaces';
import { IntlProvider } from 'react-intl';
import { LegendLayout } from '../../layouts';
import { Gauge as GaugeCls } from '../framework';

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

describe('Gauge framework', () => {
  const { config, title, data, legends } = Basic.args as GaugeProps;
  const gaugeCls = new GaugeCls();
  const legendTestId = 'legend-layout';

  beforeAll(() => {
    config.type = ChartType.GAUGE;
    render(
      <IntlProvider locale="zh-CH" messages={{}}>
        <LegendLayout config={config} title={title} data={data} legendList={legends || []} chart={gaugeCls} />
      </IntlProvider>
    );
  });

  test('render', async () => {
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
    gaugeCls.update(data);
  });
});
