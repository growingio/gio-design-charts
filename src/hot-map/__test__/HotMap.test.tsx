import React from 'react';
import { render } from '@testing-library/react';
import { HotMap, HotMapProps } from '../index';

describe('HotMap public data input', () => {
  test('renders source records through the declared public props', () => {
    // Keep the documented object input type-checked so a return to array-only props fails here.
    const props: HotMapProps = {
      data: { source: [{ day: '周一', channel: '自然搜索', ratio: 0.3 }] },
      config: {
        chart: { autoFit: false, height: 200 },
        hotMap: { xField: 'day', yField: 'channel', zField: 'ratio' },
      },
    };
    const view = render(<HotMap {...props} />);
    expect(view.container.querySelector('canvas')).not.toBeNull();
  });
});
