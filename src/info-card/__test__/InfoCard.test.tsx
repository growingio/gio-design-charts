import React from 'react';
import { act, render, screen } from '@testing-library/react';
import InfoCardBox from '../InfoCardBox';
import InfoCard from '../InfoCard';
import { Legends } from '../../interfaces';
import { renderHook } from '@testing-library/react-hooks';
import useTunnel from '../../hooks/useTunnel';

export const mappingData = {
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
};

export const triggerItems = [
  {
    title: '2.加入购物车',
    data: {
      type: '2.加入购物车',
      city: '南京',
      value: 18334,
    },
    mappingData,
    name: '南京',
    value: '18334',
    color: '#62CE6C',
    marker: true,
    x: 429.53749084472656,
    y: 79.05936,
  },
];

export const triggerItemsPrev = [
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
    mappingData,
    name: '南京',
    value: '18334',
    color: '#62CE6C',
    marker: true,
    x: 429.53749084472656,
    y: 79.05936,
  },
] as any[];

export const legends: Legends = {
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
};

export const options = {
  defaultStyles: {},
};

export const config = {
  type: 'bar',
  bar: {
    color: 'city',
  },
};

const trigger = 'mouseover';
const infoCardBoxTestid = 'infoCardBox';

describe('InfoCard', () => {
  test('render InfoCardBox', async () => {
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    render(<InfoCardBox acceptor={acceptor} legends={legends} trigger={trigger} options={options} config={config} />);
    act(() => {
      register(triggerItems);
    });
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });

  test('render InfoCardBox without config and options', async () => {
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    render(
      <InfoCardBox
        acceptor={acceptor}
        legends={legends}
        trigger={trigger}
        config={undefined as any}
        options={undefined as any}
      />
    );
    act(() => {
      register(triggerItems);
    });
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });

  test('render InfoCardBox without config.tooltip', async () => {
    const newConfig = { ...config, tooltip: {} };
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    render(
      <InfoCardBox acceptor={acceptor} legends={legends} trigger={trigger} options={options} config={newConfig} />
    );
    act(() => {
      register(triggerItems);
    });
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });

  test('render InfoCardBox with empty config', async () => {
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    render(<InfoCardBox acceptor={acceptor} legends={legends} trigger={trigger} options={options} config={{}} />);
    act(() => {
      register(triggerItems);
    });
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });

  test('render InfoCardBox with type config', async () => {
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    render(
      <InfoCardBox acceptor={acceptor} legends={legends} trigger={trigger} options={options} config={{ type: 'bar' }} />
    );
    act(() => {
      register(triggerItems);
    });
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });

  test('render InfoCard with prev data', async () => {
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    render(<InfoCardBox acceptor={acceptor} legends={legends} trigger={trigger} options={options} config={config} />);
    act(() => {
      register(triggerItemsPrev);
    });
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
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
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    render(
      <InfoCardBox acceptor={acceptor} legends={legends} trigger={trigger} options={options} config={tooltipConfig} />
    );
    act(() => {
      register(triggerItems);
    });
    expect(await screen.findByTestId('customTooltip')).toBeTruthy();
  });

  test('render custom tooltip with InfoCard', async () => {
    const tooltipConfig = {
      tooltip: {
        render(renderOptions: any) {
          return <InfoCard {...renderOptions} />;
        },
      },
      type: 'bar',
      bar: {
        color: 'city',
      },
    };
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    render(
      <InfoCardBox acceptor={acceptor} legends={legends} trigger={trigger} options={options} config={tooltipConfig} />
    );
    act(() => {
      register(triggerItems);
    });
    expect(await screen.findByTestId('infoCard')).toBeTruthy();
  });

  test('render custom tooltip with noData InfoCard', async () => {
    const tooltipConfig = {
      tooltip: {
        render(renderOptions: any) {
          const { data, ...otherOptions } = renderOptions;
          return <InfoCard {...otherOptions} />;
        },
      },
      type: 'bar',
      bar: {
        position: 'tm*value',
        color: 'city',
      },
    };
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    render(
      <InfoCardBox acceptor={acceptor} legends={legends} trigger={trigger} options={options} config={tooltipConfig} />
    );
    act(() => {
      register(triggerItems);
    });
    expect(await screen.findByTestId('infoCard')).toBeTruthy();
  });

  test('render custom tooltip with empty data InfoCard', async () => {
    const tooltipConfig = {
      tooltip: {
        render(renderOptions: any) {
          const { data, ...otherOptions } = renderOptions;
          return <InfoCard {...otherOptions} data={[{}]} />;
        },
      },
      type: 'bar',
      bar: {
        color: 'city',
      },
    };
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    render(
      <InfoCardBox acceptor={acceptor} legends={legends} trigger={trigger} options={options} config={tooltipConfig} />
    );
    act(() => {
      register(triggerItems);
    });
    expect(await screen.findByTestId('infoCard')).toBeTruthy();
  });

  test('render custom tooltip with injectComponent', async () => {
    const tooltipConfig = {
      tooltip: {
        render(renderOptions: any) {
          return (
            <InfoCard
              {...renderOptions}
              injectComponent={() => <div data-testid="injectComponent">Inject Component</div>}
            />
          );
        },
      },
      type: 'bar',
      bar: {
        color: 'city',
      },
    };
    const { result } = renderHook(() => useTunnel());
    const [register, acceptor] = result.current;
    const box = render(
      <InfoCardBox acceptor={acceptor} legends={legends} trigger={trigger} options={options} config={tooltipConfig} />
    );

    act(() => {
      register(triggerItems);
    });
    const infoCardBox = await box.findByTestId(infoCardBoxTestid);
    expect(infoCardBox).toBeTruthy();

    const infoCard = await box.findByTestId('infoCard');
    expect(infoCard).toBeTruthy();

    const injectComponent = await box.findByTestId('injectComponent');
    expect(injectComponent).toBeTruthy();
  });
});
