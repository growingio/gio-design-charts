import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoCardBox from '../InfoCardBox';
import InfoCard from '../InfoCard';

const triggerItems = [
  {
    title: '2.加入购物车',
    data: {
      type: '2.加入购物车',
      city: '南京',
      value: 18334,
    },
    mappingData: {
      _origin: {
        type: '2.加入购物车',
        city: '南京',
        value: 18334,
      },
      points: [
        {
          x: 0.35567894225227825,
          y: 0,
        },
        {
          x: 0.35567894225227825,
          y: 0.73336,
        },
        {
          x: 0.39432105774772175,
          y: 0.73336,
        },
        {
          x: 0.39432105774772175,
          y: 0,
        },
      ],
      x: 429.53749084472656,
      y: 79.05936,
      color: '#62CE6C',
      shape: 'column-element',
    },
    name: '南京',
    value: '18334',
    color: '#62CE6C',
    marker: true,
    x: 429.53749084472656,
    y: 79.05936,
  },
];

const triggerItemsPrev = [
  {
    title: '2.加入购物车',
    data: {
      type: '2.加入购物车',
      city: '南京',
      value: 18334,
      prev: {
        type: '2.加入购物车',
        city: '南京2',
        value: 18333,
      },
    },
    mappingData: {
      _origin: {
        type: '2.加入购物车',
        city: '南京',
        value: 18334,
      },
      points: [
        {
          x: 0.35567894225227825,
          y: 0,
        },
        {
          x: 0.35567894225227825,
          y: 0.73336,
        },
        {
          x: 0.39432105774772175,
          y: 0.73336,
        },
        {
          x: 0.39432105774772175,
          y: 0,
        },
      ],
      x: 429.53749084472656,
      y: 79.05936,
      color: '#62CE6C',
      shape: 'column-element',
    },
    name: '南京',
    value: '18334',
    color: '#62CE6C',
    marker: true,
    x: 429.53749084472656,
    y: 79.05936,
  },
];

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
};

const trigger = 'mouseover';

const options = {
  defaultStyles: {},
};

const config = {
  type: 'bar',
  bar: {
    color: 'city',
  },
};

describe('InfoCard', () => {
  test('render InfoCard', async () => {
    render(
      <InfoCardBox triggerItems={triggerItems} legends={legends} trigger={trigger} options={options} config={config} />
    );
    expect(await screen.findByTestId('infoCardBox')).toBeTruthy();
  });

  test('render InfoCard with prev data', async () => {
    render(
      <InfoCardBox
        triggerItems={triggerItemsPrev}
        legends={legends}
        trigger={trigger}
        options={options}
        config={config}
      />
    );
    expect(await screen.findByTestId('infoCardBox')).toBeTruthy();
  });

  test('render custom tooltip', async () => {
    const tooltipConfig = {
      tooltip: {
        render() {
          return <span data-testid="customTooltip">Custom Tooltip</span>;
        },
      },
      type: 'bar',
      bar: {
        color: 'city',
      },
    };
    render(
      <InfoCardBox
        triggerItems={triggerItems}
        legends={legends}
        trigger={trigger}
        options={options}
        config={tooltipConfig}
      />
    );
    expect(await screen.findByTestId('customTooltip')).toBeTruthy();
  });

  test('render custom tooltip with InfoCard', async () => {
    const tooltipConfig = {
      tooltip: {
        render(...options) {
          return <InfoCard {...options} />;
        },
      },
      type: 'bar',
      bar: {
        color: 'city',
      },
    };
    render(
      <InfoCardBox
        triggerItems={triggerItems}
        legends={legends}
        trigger={trigger}
        options={options}
        config={tooltipConfig}
      />
    );
    expect(await screen.findByTestId('infoCard')).toBeTruthy();
  });

  test('render custom tooltip with injectComponent', async () => {
    const tooltipConfig = {
      tooltip: {
        render(...options) {
          return (
            <InfoCard {...options} injectComponent={() => <div data-testid="injectComponent">Inject Component</div>} />
          );
        },
      },
      type: 'bar',
      bar: {
        color: 'city',
      },
    };
    const box = render(
      <InfoCardBox
        triggerItems={triggerItems}
        legends={legends}
        trigger={trigger}
        options={options}
        config={tooltipConfig}
      />
    );

    const infoCardBox = await box.findByTestId('infoCardBox');
    expect(infoCardBox).toBeTruthy();

    const infoCard = await box.findByTestId('infoCard');
    expect(infoCard).toBeTruthy();

    const injectComponent = await box.findByTestId('injectComponent');
    expect(injectComponent).toBeTruthy();
  });
});
