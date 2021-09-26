import React from 'react';
import { render, screen } from '@testing-library/react';

import { barChart, handleLegend } from '../framework';
import { BarDefault } from '../demos/Bar.stories';
import { ChartType } from '../../interfaces';
import { getLegends } from '../../hooks/useLegends';
import { Chart } from '@antv/g2';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';
import { BarProps } from '../Bar';

const { config, legends: legendList, data } = BarDefault.args as BarProps;
const [legends] = getLegends(ChartType.AREA, legendList);
describe('bar fromework', () => {
  test('call barChart', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    barChart(options, config);
  });

  test('with id', () => {
    const options = {
      data,
      legends,
    };
    barChart(options, config);
  });
});

describe('handleLegend', () => {
  test('call it', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    const { chart } = barChart(options, config);
    handleLegend([chart as Chart], legends, config);
  });
  test('call it without config', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    const { chart } = barChart(options, config);
    handleLegend([chart as Chart], legends, {});
  });
});
