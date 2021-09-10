import React from 'react';
import { render, screen } from '@testing-library/react';
import VerticalMenu from '../VerticalMenu';

const verticalMenuTestid = 'vertical-menu';
describe('Bar Chart', () => {
  test('render Chart', async () => {
    render(
      <VerticalMenu
        height={200}
        width={200}
        scale={{
          max: 100,
          range: [0.1, 0.4, 0.7],
          ticks: ['test1', 'test2', 'test3'],
        }}
      />
    );
    expect(await screen.findByTestId(verticalMenuTestid)).toBeTruthy();
  });

  test('test VerticalMenu with error', async () => {
    render(
      <VerticalMenu
        height={200}
        width={200}
        scale={{
          max: -10,
          range: [0.1],
        }}
      />
    );
    expect(await screen.findByTestId(verticalMenuTestid)).toBeTruthy();
  });

  test('test VerticalMenu without range', async () => {
    render(
      <VerticalMenu
        height={200}
        width={200}
        scale={{
          max: -10,
        }}
      />
    );
    expect(await screen.findByTestId(verticalMenuTestid)).toBeTruthy();
  });

  test('test VerticalMenu without scale', async () => {
    render(<VerticalMenu height={200} width={200} />);
    expect(await screen.findByTestId(verticalMenuTestid)).toBeTruthy();
  });
});
