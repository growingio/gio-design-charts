import React from 'react';
import { render } from '@testing-library/react';

import Legend from '../Legend';

describe('Legend', () => {
  const data = { lineDash: true, active: false, name: 'Test' };
  test('render Legend', async () => {
    render(<Legend label="" data={data} />);
  });

  test('render Legend with empty data', async () => {
    render(<Legend label="" data={null as any} />);
  });
});
