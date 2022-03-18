import React from 'react';
import { render, screen } from '@testing-library/react';

import { Line as LineCls } from '../framework';
import { BaiscLine } from '../demos/Line.stories';
import { ChartType } from '../../interfaces';
import { getLegends } from '../../hooks/useLegends';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';
import { LineProps } from '../Line';

const { config, legends: legendList, data } = BaiscLine.args as LineProps;
const [legends] = getLegends(ChartType.AREA, legendList as any);
describe('line fromework', () => {
  test('call lineChart', () => {
    const line = new LineCls();
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
    line.render(options, config);
    line.legend(legends);
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
    line.render(options, config);
    line.legend(legends);
  });
});
