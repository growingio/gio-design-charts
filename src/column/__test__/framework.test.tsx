import React from 'react';
import { render, screen } from '@testing-library/react';

import { Column as ColumnCls } from '../framework';
import { ColumnWithComponsive } from '../demos/Column.stories';
import { ChartProps, ChartType } from '../../interfaces';
import { LegendObject } from '../../legends/useLegends';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';
import { IntlProvider } from 'react-intl';
import { LegendLayout } from '../../layouts';

const { config, legends: legendList, data } = ColumnWithComponsive.args as ChartProps;
const legendObject = new LegendObject({ type: ChartType.AREA }, legendList as any);
const legends = legendObject.mapping;
describe('line fromework', () => {
  const column = new ColumnCls();
  test('call columnChart', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    column.render(options, config);
  });

  test('without legends', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
    };
    column.render(options, config);
  });

  test('with id', () => {
    const options = {
      data,
      legends,
    };
    column.render(options, config);
  });

  test('with empty config', () => {
    const options = {
      data,
      legends,
    };
    column.render(options);
  });
});

describe('handleLegend', () => {
  const column = new ColumnCls();
  test('call it', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    column.render(options, config);
    column.legend(legends);
  });
  test('call it without config', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    column.render(options, config);
    column.legend(legends);
  });
});
