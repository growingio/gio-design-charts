import React from 'react';
import { render, screen } from '@testing-library/react';

import { Line as LineCls, ContrastLine as ContrastLineCls } from '../framework';
import { BaiscLine, ContrastLineExample } from '../demos/Line.stories';
import { ChartType } from '../../interfaces';
import { getLegends } from '../../hooks/useLegends';
import { Chart } from '@antv/g2';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';
import { LineProps } from '../Line';
import { IntlProvider } from 'react-intl';
import { LegendLayout } from '../../layouts';

const { config, legends: legendList, data } = BaiscLine.args as LineProps;
const [legends] = getLegends(ChartType.AREA, legendList as any);
describe('line fromework', () => {
  test('call lineChart', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    line.render(options, config);
  });

  test('with id', () => {
    const line = new LineCls();
    const options = {
      data,
      legends,
    };
    line.render(options, config);
  });

  test('with empty config', () => {
    const line = new LineCls();
    const options = {
      data,
      legends,
    };
    line.render(options);
  });
});

describe('ContrastLine framework', () => {
  const { config, title, legends: legendList, data } = ContrastLineExample.args as LineProps;
  const line = new ContrastLineCls();
  beforeAll(() => {
    config.type = ChartType.LINE;
    render(
      <IntlProvider locale="zh-CH" messages={{}}>
        <LegendLayout config={config} title={title} data={data} legendList={legendList || []} chart={line} />
      </IntlProvider>
    );
  });

  test('render', async () => {
    expect(await screen.findByTestId(testid)).toBeTruthy();
    line.update(data);
  });
});

describe('handleLegend', () => {
  test('call it', () => {
    const line = new LineCls();
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    const { chart } = line.render(options, config);
    line.legend([chart as Chart], legends, config);
  });
  test('call it without config', () => {
    const line = new LineCls();
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    const { chart } = line.render(options, config);
    line.legend([chart as Chart], legends, {});
  });
});
