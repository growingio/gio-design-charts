import React from 'react';
import { render } from '@testing-library/react';

import Menu from '../Menu';

describe('Menu', () => {
  test('render Menu', async () => {
    render(<Menu legends={[]} />);
  });
  test('render Menu with empty legends', async () => {
    render(<Menu legends={null as any} />);
  });
});
