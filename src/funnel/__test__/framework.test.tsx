import React from 'react';
import { render, screen } from '@testing-library/react';

import { Funnel as FunnelCls } from '../framework';
import { FunnelWith3Columns } from '../demos/Funnel.stories';
import { ChartProps, ChartType } from '../../interfaces';
import { getLegends } from '../../hooks/useLegends';
import { Chart } from '@antv/g2';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';
import { getSingleData } from '../utils';

const { config, legends: legendList, data: sourceData } = FunnelWith3Columns.args as ChartProps;
const data = getSingleData(sourceData);
const [legends] = getLegends(ChartType.AREA, legendList as any);
describe('funnel fromework', () => {
  const funnel = new FunnelCls();
  test('call funnelChart', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    funnel.render(options, config);
  });

  test('with id', () => {
    const options = {
      data,
      legends,
    };
    funnel.render(options, config);
  });

  test('with empty config', () => {
    const options = {
      data,
      legends,
    };
    funnel.render(options);
  });

  test('without legends', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
    };
    funnel.render(options, config);
  });

  test('without data', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      legends,
    };
    funnel.render(options, config);
  });
});

describe('handleLegend', () => {
  const funnel = new FunnelCls();
  test('call it', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    funnel.render(options, config);
    funnel.legend(legends);
  });
  test('call it without config', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    funnel.render(options, config);
    funnel.legend(legends);
  });
});
