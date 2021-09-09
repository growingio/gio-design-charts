import React from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';

import Legends from '../Legends';

const legends = {
  北京: {
    name: '北京',
    color: '#5F87FF',
    active: true,
    type: 'funnel',
  },
  上海: {
    name: '上海',
    color: '#FFDD63',
    active: true,
    type: 'funnel',
  },
  南京: {
    name: '南京',
    color: '#62CE6C',
    active: true,
    type: 'funnel',
  },
  深圳: {
    name: '深圳',
    color: '#FFA455',
    active: true,
    type: 'funnel',
  },
  广东: {
    name: '广东',
    color: '#60BCFA',
    active: true,
    type: 'funnel',
  },
  南京2: {
    name: '南京2',
    color: '#62CE6C',
    active: true,
    type: 'funnel',
  },
  深圳2: {
    name: '深圳2',
    color: '#FFA455',
    active: true,
    type: 'funnel',
  },
  广东2: {
    name: '广东2',
    color: '#60BCFA',
    active: true,
    type: 'funnel',
  },
};

describe('Legends', () => {
  test('render Legends', async () => {
    const clickedLabel = '北京';
    render(
      <Legends
        legends={legends}
        onClick={(label) => {
          expect(label).toBe(clickedLabel);
        }}
        offsetWidth={1000}
      />
    );

    expect(await screen.findByTestId('legends')).toBeTruthy();

    const legend = await screen.findByTestId(`legend-item-${clickedLabel}`);
    expect(legend).toBeTruthy();

    const clickLegendEvent = createEvent.click(legend);
    fireEvent(legend, clickLegendEvent);
  });

  test('render Legends and click lenged within binding onClick', async () => {
    const clickedLabel = '北京';
    render(<Legends legends={legends} offsetWidth={1000} />);

    expect(await screen.findByTestId('legends')).toBeTruthy();

    const legend = await screen.findByTestId(`legend-item-${clickedLabel}`);
    expect(legend).toBeTruthy();

    const clickLegendEvent = createEvent.click(legend);
    fireEvent(legend, clickLegendEvent);
  });

  test('render Legends with menu', async () => {
    render(<Legends legends={legends} offsetWidth={200} />);

    expect(await screen.findByTestId('legends')).toBeTruthy();

    expect(await screen.findByTestId('legend-others')).toBeTruthy();
  });
});
