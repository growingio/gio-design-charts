import React from 'react';
import { render, screen } from '@testing-library/react';

import { barChart, handleLegend } from '../barChart';
import { BarDefault } from '../../components/bar/demos/Bar.stories';
import { ChartProps, ChartType } from '../../interface';
import { getLegends } from '../../components/hooks/useLegends';
import { Chart } from '@antv/g2';
import { chartComponentTestid, ChartCom } from './common.test';

const { config, legends: legendList, data } = BarDefault.args as ChartProps;
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
