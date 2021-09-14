import React from 'react';
import { render, screen } from '@testing-library/react';

import { funnelChart, handleLegend } from '../framework';
import { FunnelWithLink } from '../demos/Funnel.stories';
import { ChartProps, ChartType } from '../../interface';
import { getLegends } from '../../hooks/useLegends';
import { Chart } from '@antv/g2';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';
import { getSingleData } from '../utils';

const { config, legends: legendList, data: sourceData } = FunnelWithLink.args as ChartProps;
const data = getSingleData(sourceData);
const [legends] = getLegends(ChartType.AREA, legendList);
describe('funnel fromework', () => {
  test('call funnelChart', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    funnelChart(options, config);
  });

  test('with id', () => {
    const options = {
      data,
      legends,
    };
    funnelChart(options, config);
  });

  test('with empty config', () => {
    const options = {
      data,
      legends,
    };
    funnelChart(options);
  });

  test('without legends', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
    };
    funnelChart(options, config);
  });

  test('without data', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      legends,
    };
    funnelChart(options, config);
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
    const { chart } = funnelChart(options, config);
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
    const { chart } = funnelChart(options, config);
    handleLegend([chart as Chart], legends, {});
  });
});
