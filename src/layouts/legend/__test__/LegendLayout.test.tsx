import React from 'react';
import { act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { ChartProps } from '../../../interfaces';
import { areaChart, handleLegend } from '../../../area/framework';
import { AreaStack } from '../../../area/demos/Area.stories';
import LegendLayout from '../LegendLayout';
import { IntlProvider } from 'react-intl';
import en from '../../../locales/en.json';

const legendLayoutTestid = 'legend-layout';

describe('LegendLayout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  test('render', () => {
    const { legends, config, data } = AreaStack.args as ChartProps;
    config.type = 'area';
    const newConfig = {
      ...config,
      chart: {
        ...(config.chart || {}),
        autoFit: false,
      },
    };
    render(
      <IntlProvider defaultLocale="zh-CN" locale="zh-CN" messages={en}>
        <LegendLayout
          config={newConfig}
          data={data}
          legendList={legends as any}
          callChart={areaChart}
          handleLegend={handleLegend}
          width={1050}
        />
      </IntlProvider>
    );

    const element = screen.getByTestId(legendLayoutTestid);
    act(() => {
      Object.defineProperty(element, 'offsetWidth', { writable: true, configurable: true, value: 500 });
      global.innerWidth = 2000;
      global.dispatchEvent(new Event('resize'));
      Object.defineProperty(element, 'offsetWidth', { writable: true, configurable: true, value: 520 });
      global.dispatchEvent(new Event('resize'));
      Object.defineProperty(element, 'offsetWidth', { writable: true, configurable: true, value: 550 });
      global.dispatchEvent(new Event('resize'));
    });
  });
});
