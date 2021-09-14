import React from 'react';
import { render, screen } from '@testing-library/react';
import ScrollYDirector from '../ScrollYDirector';
import { StackingDiagramBar } from '../../../bar/demos/Bar.stories';
import { ChartProps } from '../../../interface';
import { barChart, handleLegend } from '../../../frameworks/barChart';

describe('ScrollYDirector', () => {
  const scrollyTestId = 'scroll-y-director';
  const { legends: legendList, config, data } = StackingDiagramBar.args as ChartProps;

  test('render', async () => {
    render(
      <ScrollYDirector
        config={config}
        data={data}
        legendList={legendList}
        handleLegend={handleLegend}
        callChart={barChart}
      />
    );
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render without config', async () => {
    render(
      <ScrollYDirector
        config={undefined as any}
        data={data}
        legendList={legendList}
        handleLegend={handleLegend}
        callChart={barChart}
      />
    );
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });
});
