import React from 'react';
import { render, screen } from '@testing-library/react';
import ScrollYLayout from '../ScrollYLayout';
import { StackingDiagramBar } from '../../../bar/demos/Bar.stories';
import { ChartProps } from '../../../interfaces';
import { Bar as BarCls } from '../../../bar/framework';
import { IntlProvider } from 'react-intl';
import en from '../../../locales/en.json';

describe('ScrollYLayout', () => {
  const scrollyTestId = 'scroll-y-layout';
  const { legends: legendList, config, data } = StackingDiagramBar.args as ChartProps;
  const bar = new BarCls();

  test('render', async () => {
    render(
      <IntlProvider defaultLocale="zh-CN" locale="zh-CN" messages={en}>
        <ScrollYLayout
          config={config}
          data={data}
          legendList={legendList as any}
          handleLegend={bar.legend}
          callChart={bar.render}
        />
      </IntlProvider>
    );
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render without config', async () => {
    render(
      <IntlProvider defaultLocale="zh-CN" locale="zh-CN" messages={en}>
        <ScrollYLayout
          config={undefined as any}
          data={data}
          legendList={legendList as any}
          handleLegend={bar.legend}
          callChart={bar.render}
        />
      </IntlProvider>
    );
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });
});
