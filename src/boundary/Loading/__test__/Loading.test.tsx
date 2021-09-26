import React from 'react';
import { render, screen } from '@testing-library/react';
import { Area } from '../../../area';
import { Loading as LoadingStory } from '../demos/Loading.stories';

describe('Loading', () => {
  test('default', () => {
    render(<Area {...LoadingStory.args} loading={true} />);
    const loadingTestid = 'loading';
    expect(screen.getByTestId(loadingTestid)).toBeTruthy();
  });
});
