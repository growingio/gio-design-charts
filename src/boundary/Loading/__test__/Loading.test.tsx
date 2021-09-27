import React from 'react';
import { render, screen } from '@testing-library/react';
import { Line } from '../../../line';
import { Loading as LoadingStory } from '../demos/Loading.stories';
import { LineProps } from '../../../line/Line';

describe('Loading', () => {
  test('default', () => {
    render(<Line {...(LoadingStory.args as LineProps)} loading={true} />);
    const loadingTestid = 'loading';
    expect(screen.getByTestId(loadingTestid)).toBeTruthy();
  });
});
