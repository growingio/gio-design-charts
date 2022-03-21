import React from 'react';
import { render, screen } from '@testing-library/react';

import { Bar as BarCls } from '../framework';
import { BarDefault } from '../demos/Bar.stories';
import { ChartType } from '../../interfaces';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';
import { BarProps } from '../Bar';
import { LegendObject } from '../../legends/useLegends';

const { config, legends: legendList, data } = BarDefault.args as BarProps;
const legendObj = new LegendObject({ type: ChartType.AREA }, legendList as any);
describe('bar fromework', () => {
  const bar = new BarCls();
  test('call barChart', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends: legendObj.mapping,
    };
    bar.render(options, config);
  });

  test('with id', () => {
    const options = {
      data,
      legends: legendObj.mapping,
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
      legends: legendObj.mapping,
    };
    bar.render(options, config);
    bar.legend(legendObj.mapping);
  });
});
