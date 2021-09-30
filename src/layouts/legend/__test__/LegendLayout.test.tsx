import React from 'react';
import { act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { ChartProps } from '../../../interfaces';
import { areaChart, handleLegend } from '../../../area/framework';
import { AreaStack } from '../../../area/demos/Area.stories';
import LegendLayout from '../LegendLayout';

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
    render(
      <LegendLayout
        config={config}
        data={data}
        legendList={legends as any}
        callChart={areaChart}
        handleLegend={handleLegend}
        width={1050}
      />
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
