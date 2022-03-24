import React from 'react';
import { act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { ChartProps } from '../../../interfaces';
import { Area as AreaCls } from '../../../area/framework';
import { PercentArea } from '../../../area/demos/Area.stories';
import LegendLayout from '../LegendLayout';
import { IntlProvider } from 'react-intl';
import en from '../../../locales/en.json';

const legendLayoutTestid = 'legend-layout';

describe('LegendLayout2', () => {
  const area = new AreaCls();
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  test('render without scroll', () => {
    const { legends, config, data } = PercentArea.args as ChartProps;
    config.type = 'area';
    render(
      <IntlProvider defaultLocale="zh" locale="zh-CN" messages={en}>
        <LegendLayout
          config={config}
          data={data}
          legendList={legends as any}
          callChart={area.render}
          handleLegend={area.legend}
          width={150}
        />
      </IntlProvider>
    );
    const element = screen.getByTestId(legendLayoutTestid);
    act(() => {
      Object.defineProperty(element, 'offsetWidth', { writable: true, configurable: true, value: 200 });
      global.innerWidth = 3000;
      global.dispatchEvent(new Event('resize'));
      Object.defineProperty(element, 'offsetWidth', { writable: true, configurable: true, value: 420 });
      global.dispatchEvent(new Event('resize'));
    });
  });
});
