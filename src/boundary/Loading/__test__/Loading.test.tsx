import React from 'react';
import { render, screen } from '@testing-library/react';
import { Area } from '../../../area';
import { Loading as LoadingStory } from '../demos/Loading.stories';

describe('No Data', () => {
  test('default', () => {
    render(<Area {...LoadingStory.args} data={[]} />);
    const loadingTestid = 'loading';
    expect(screen.getByTestId(loadingTestid)).toBeTruthy();
  });
});
