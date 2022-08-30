import React from 'react';
import { render, screen } from '@testing-library/react';
import DragBar from '../../../bar/DragBar';
import { DragBarProps } from '../../../bar/Bar';
import { Example } from '../demos/DragLayout.stories';

describe('Bar Chart', () => {
  const legendTestid = 'drag-layout';
  test('render Chart', async () => {
    render(<DragBar {...(Example.args as DragBarProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });
});
