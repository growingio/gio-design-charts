import React from 'react';
import { act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { ChartProps } from '../../../interfaces';
import { areaChart, handleLegend } from '../../../area/framework';
import { AreaWithSample } from '../../../area/demos/Area.stories';
import LegendDirector from '../LegendDirector';

const legendDirectorTestid = 'legend-director';

describe('LegendDirector', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();

    jest.useRealTimers();
  });
  test('use useOffset in component', () => {
    const { legends, config, data } = AreaWithSample.args as ChartProps;
    render(
      <LegendDirector
        config={config}
        data={data}
        legendList={legends}
        callChart={areaChart}
        handleLegend={handleLegend}
      />
    );
    const element = screen.getByTestId(legendDirectorTestid);
    jest.runAllTimers();
    act(() => {
      Object.defineProperty(element, 'offsetWidth', { writable: true, configurable: true, value: 200 });
      global.innerWidth = 2000;
      global.dispatchEvent(new Event('resize'));
      Object.defineProperty(element, 'offsetWidth', { writable: true, configurable: true, value: 300 });
      global.dispatchEvent(new Event('resize'));
    });
  });
});
