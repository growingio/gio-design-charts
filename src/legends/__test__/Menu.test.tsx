import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import Menu from '../Menu';

describe('Menu', () => {
  test('render Menu', async () => {
    render(<IntlProvider locale="zh-CH" messages={{}}><Menu legends={[]} height={100} /></IntlProvider>);
  });
  test('render Menu with empty legends', async () => {
    render(<IntlProvider locale="zh-CH" messages={{}}><Menu legends={null as any} height={100} /></IntlProvider>);
  });
});
