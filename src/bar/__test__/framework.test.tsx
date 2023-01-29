import React from 'react';
import { render, screen } from '@testing-library/react';

import { Bar as BarCls, TimeBar as TimeBarCls } from '../framework';
import { BarDefault } from '../demos/Bar.stories';
import { ChartType } from '../../interfaces';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';
import { BarProps } from '../Bar';
import { LegendObject } from '../../legends/useLegends';
import { LegendLayout } from '../../layouts';
import { IntlProvider } from 'react-intl';
import { act } from 'react-dom/test-utils';
import { Contrast } from '../demos/TimeIntervalBar.stories';

const { config, legends: legendList, data, title } = BarDefault.args as BarProps;
const legendObj = new LegendObject({ type: ChartType.AREA }, legendList as any);
const legendTestId = 'legend-layout';

describe('Bar Fromework', () => {
  const barCls = new BarCls();

  beforeAll(() => {
    config.type = ChartType.BAR;
    const newData = [
      { name: '页面浏览的总数量', value: 120124 },
      { name: '访问推出的总数量', value: -241234 },
      { name: '步步盈增的用户量', value: -343455 },
    ];
    render(
      <IntlProvider locale="zh-CH" messages={{}}>
        <LegendLayout config={config} title={title} data={newData} legendList={legendList || []} chart={barCls} />
      </IntlProvider>
    );
  });

  test('render', async () => {
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
    act(() => {
      jest.runAllTimers();
    });
    barCls.update(data as any);
    barCls.legend(legendObj.mapping);
  });

  test('call barChart', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends: legendObj.mapping,
    };
    barCls.render(options, config);
  });

  test('update', () => {
    barCls.update(data);
  });

  test('with id', () => {
    const options = {
      data,
      legends: legendObj.mapping,
    };
    barCls.render(options, config);
  });
});

describe('TimeBar Framework', () => {
  const timeBarCls = new TimeBarCls();
  const { config, legends: legendList, data, title } = Contrast.args as BarProps;
  config.type = ChartType.BAR;
  const legendObject = new LegendObject(config, legendList || []);

  beforeAll(() => {
    config.type = ChartType.BAR;
    const newData = [
      { name: '页面浏览的总数量', value: 120124 },
      { name: '访问推出的总数量', value: -241234 },
      { name: '步步盈增的用户量', value: -343455 },
    ];
    render(
      <IntlProvider locale="zh-CH" messages={{}}>
        <LegendLayout config={config} title={title} data={newData} legendList={legendList || []} chart={timeBarCls} />
      </IntlProvider>
    );
  });

  test('render', async () => {
    expect(await screen.findByTestId(legendTestId)).toBeTruthy();
    act(() => {
      jest.runAllTimers();
    });
    timeBarCls.update(data as any);
    timeBarCls.legend(legendObject.mapping);
    timeBarCls.clear();
  });
});

describe('handleLegend', () => {
  const bar = new BarCls();
  test('call it', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends: legendObj.mapping,
    };
    bar.render(options, config);
    bar.legend(legendObj.mapping);
  });
});
