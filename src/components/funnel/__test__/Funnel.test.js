import React from 'react';
import { render, screen } from '@testing-library/react';
import FunnelChart from '../FunnelChart';
import FunnelGroupChart from '../FunnelGroupChart';
import { FunnelWithLink } from '../demos/Funnel.stories';

describe('Funnel Chart', () => {
  test('render Chart', async () => {
    render(<FunnelChart {...FunnelWithLink.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });
});
