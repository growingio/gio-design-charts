import React from 'react';
import { act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { ChartProps } from '../../../interfaces';
import { areaChart, handleLegend } from '../../../area/framework';
import { PercentArea } from '../../../area/demos/Area.stories';
import LegendLayout from '../LegendLayout';

const legendLayoutTestid = 'legend-layout';

describe('LegendLayout2', () => {
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
      <LegendLayout
        config={config}
        data={data}
        legendList={legends}
        callChart={areaChart}
        handleLegend={handleLegend}
        width={150}
      />
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
