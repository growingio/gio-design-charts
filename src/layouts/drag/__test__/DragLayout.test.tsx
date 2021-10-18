import React from 'react';
import { render, screen } from '@testing-library/react';
import DragBar from '../../../bar/DragBar';
import { BarDefault } from '../../../bar/demos/Bar.stories';
import { DragBarProps } from '../../../bar/Bar';

describe('Bar Chart', () => {
  const legendTestid = 'drag-layout';
  test('render Chart', async () => {
    render(<DragBar {...(BarDefault.args as DragBarProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });
});
