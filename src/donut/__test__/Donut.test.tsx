import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Donut, { DonutProps } from '../Donut';
import { Basic, Dark } from '../demos/Donut.stories';
import { Donut as DonutCls } from '../framework';
import { IntlProvider } from 'react-intl';
import { LegendLayout } from '../../layouts';
import { ChartType } from '../../interfaces';
import { LegendObject } from '../../legends/useLegends';

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
    const { config } = Dark.args as DonutProps;
    render(
      <Donut
        {...(Dark.args as DonutProps)}
        config={{ ...config, chart: { autoFit: true, height: 400, theme: 'dark' } }}
      />
    );
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});

describe('Donut framework', () => {
  const legendTestId = 'legend-layout';
  const donutCls = new DonutCls();
  const { config, data, title, legends } = Dark.args as DonutProps;
  config.type = ChartType.DONUT;
  const legendObject = new LegendObject(config, legends || []);

  beforeAll(() => {
    config.type = ChartType.DONUT;
    render(
      <IntlProvider locale="zh-CH" messages={{}}>
        <LegendLayout config={config} title={title} data={data} legendList={legends || []} chart={donutCls} />
      </IntlProvider>
    );
  });

  test('render', async () => {
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
    donutCls.update(data as any);
    donutCls.legend(legendObject.mapping);
  });
});
