import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChart from '../LineChart';
import { LineWithDash, LineWithMenu, LineWithOneLine } from '../demos/Line.stories';

describe('Line Chart', () => {
  const legendTestId = 'legend-director';
  test('render Chart', async () => {
    render(<LineChart {...LineWithOneLine.args} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with dash', async () => {
    render(<LineChart {...LineWithDash.args} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });

  test('render Chart with multi menus', async () => {
    render(<LineChart {...LineWithMenu.args} />);
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
  });
});
