import React from 'react';
import { render, screen } from '@testing-library/react';

import { areaChart, handleLegend } from '../framework';
import { AreaStack } from '../demos/Area.stories';
import { ChartProps, ChartType } from '../../interfaces';
import { getLegends } from '../../hooks/useLegends';
import { DEFAULT_LINEDASH } from '../../theme';
import { Chart } from '@antv/g2';

import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';

const { config, legends: legendList, data } = AreaStack.args as ChartProps;
const [legends] = getLegends(ChartType.AREA, legendList);
describe('areaChart', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('call areaChart', () => {
    render(<ChartCom />);
    jest.runAllTimers();
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    areaChart(options, config);
  });

  test('call areaChart with lineDash', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends: { 北京: { name: '北京', color: '#5F87FF', active: true, type: 'area', lineDash: DEFAULT_LINEDASH } },
    };
    areaChart(options, config);
  });
  test('call areaChart without legends', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
    };
    areaChart(options, config);
  });
  test('call areaChart without config', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
    };
    areaChart(options);
  });
  test('call areaChart without id', () => {
    const options = {
      data,
    };
    areaChart(options, config);
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
    const { chart } = areaChart(options, config);
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
    const { chart } = areaChart(options, config);
    handleLegend([chart as Chart], legends, {});
  });

  test('call it without legends', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    const { chart } = areaChart(options, config);
    handleLegend([chart as Chart], undefined as any, config);
  });
});
