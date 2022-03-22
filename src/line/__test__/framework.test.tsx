import React from 'react';
import { render, screen } from '@testing-library/react';

import { Line as LineCls } from '../framework';
import { BaiscLine, ContrastLineExample } from '../demos/Line.stories';
import { ChartType } from '../../interfaces';
import { LegendObject } from '../../legends/useLegends';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';
import { LineProps } from '../Line';
import { IntlProvider } from 'react-intl';
import { LegendLayout } from '../../layouts';

const { config, legends: legendList, data } = BaiscLine.args as LineProps;

const legendObject = new LegendObject({ type: ChartType.AREA }, legendList as any);
describe('line fromework', () => {
  test('call lineChart', () => {
    render(<ChartCom />);
    const line = new LineCls();
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legendObject,
    };
    line.render(options, config);
  });

  test('with id', () => {
    const line = new LineCls();
    const options = {
      data,
      legendObject,
    };
    line.render(options, config);
  });

  test('with empty config', () => {
    const line = new LineCls();
    const options = {
      data,
      legendObject,
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
      legendObject,
    };
    line.render(options, config);
    // line.legend(legends);
  });
  test('call it without config', () => {
    const line = new LineCls();
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legendObject,
    };
    line.render(options, config);
    // line.legend(legends);
  });
});
