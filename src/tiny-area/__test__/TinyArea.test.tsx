import React from 'react';
import { act, render } from '@testing-library/react';
import TinyArea from '../TinyArea';
import { Usage } from '../demos/TinyArea.stories';

describe('TinyArea Chart', () => {
  const baldTestId = 'bald-layout';
  test('render Chart', () => {
    render(
      <TinyArea
        data={[1, 2, 3, 4, 5, 6]}
        config={{
          chart: {
            autoFit: true,
            height: 60,
          },
        }}
      />
    );
    act(() => {
      // expect(screen.getByTestId(baldTestId)).toBeTruthy();
    });
  });
});
