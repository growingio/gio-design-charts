import React from 'react';
import { render, screen } from '@testing-library/react';
import AreaChart from '../AreaChart';
import { AreaStack, AreaWithSample, PercentArea } from '../demos/Area.stories';

describe('Area Chart', () => {
  const testid = 'legend-director';

  test('render Chart', async () => {
    render(<AreaChart {...AreaWithSample.args} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });

  test('render Stack Chart', async () => {
    render(<AreaChart {...AreaStack.args} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });

  test('render Percent Chart', async () => {
    render(<AreaChart {...PercentArea.args} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });
});
