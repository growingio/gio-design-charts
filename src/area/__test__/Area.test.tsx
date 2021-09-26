import React from 'react';
import { render, screen } from '@testing-library/react';
import Area, { AreaProps } from '../Area';
import { AreaStack, PercentArea } from '../demos/Area.stories';

describe('Area Chart', () => {
  const testid = 'legend-layout';

  test('render Stack Chart', async () => {
    render(<Area {...(AreaStack.args as AreaProps)} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });

  test('render Percent Chart', async () => {
    render(<Area {...(PercentArea.args as AreaProps)} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });

  test('render Chart with empty legends', async () => {
    const { legends, ...props } = PercentArea.args as AreaProps;
    render(<Area {...(props as AreaProps)} />);
    expect(await screen.findByTestId(testid)).toBeTruthy();
  });
});
