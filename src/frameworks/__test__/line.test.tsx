import React from 'react';
import { render, screen } from '@testing-library/react';

import { lineChart, handleLegend } from '../lineChart';
import { LineWithOneLine } from '../../line/demos/Line.stories';
import { ChartProps, ChartType } from '../../interface';
import { getLegends } from '../../hooks/useLegends';
import { Chart } from '@antv/g2';
import { chartComponentTestid, ChartCom } from './common.test';

const { config, legends: legendList, data } = LineWithOneLine.args as ChartProps;
const [legends] = getLegends(ChartType.AREA, legendList);
describe('line fromework', () => {
  test('call lineChart', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    lineChart(options, config);
  });

  test('with id', () => {
    const options = {
      data,
      legends,
    };
    lineChart(options, config);
  });

  test('with empty config', () => {
    const options = {
      data,
      legends,
    };
    lineChart(options);
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
    const { chart } = lineChart(options, config);
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
    const { chart } = lineChart(options, config);
    handleLegend([chart as Chart], legends, {});
  });
});