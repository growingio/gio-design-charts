import React from 'react';
import { render, screen } from '@testing-library/react';

import { Bar as BarCls } from '../framework';
import { BarDefault } from '../demos/Bar.stories';
import { ChartType } from '../../interfaces';
import { getLegends } from '../../hooks/useLegends';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';
import { BarProps } from '../Bar';

const { config, legends: legendList, data } = BarDefault.args as BarProps;
const [legends] = getLegends(ChartType.AREA, legendList as any);
describe('bar fromework', () => {
  const bar = new BarCls();
  test('call barChart', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    bar.render(options, config);
  });

  test('with id', () => {
    const options = {
      data,
      legends,
    };
    bar.render(options, config);
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
      legends,
    };
    bar.render(options, config);
    bar.legend(legends);
  });
});
