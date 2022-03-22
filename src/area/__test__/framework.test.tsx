import React from 'react';
import { render, screen } from '@testing-library/react';

import { Area as AreaCls } from '../framework';
import { AreaStack } from '../demos/Area.stories';
import { ChartProps, ChartType } from '../../interfaces';
import { LegendObject } from '../../legends/useLegends';
import { DEFAULT_LINEDASH } from '../../theme';

import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';

const { config, legends: legendList, data } = AreaStack.args as ChartProps;

const legendObject = new LegendObject({ type: ChartType.AREA }, legendList as any);
describe('areaChart', () => {
  const area = new AreaCls();
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
      legendObject,
    };
    area.render(options, config);
  });

  test('call areaChart with lineDash', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends: { 北京: { name: '北京', color: '#5F87FF', active: true, type: 'area', lineDash: DEFAULT_LINEDASH } },
    };
    area.render(options, config);
  });
  test('call areaChart without legends', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
    };
    area.render(options, config);
  });

  test('call areaChart without id', () => {
    const options = {
      data,
    };
    area.render(options, config);
  });

  test('call areaChart without adjust', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends: { 北京: { name: '北京', color: '#5F87FF', active: true, type: 'area', lineDash: DEFAULT_LINEDASH } },
    };
    const { adjust, ...areaConfig } = config.area;
    area.render(options, { ...config, area: areaConfig });
  });
});

describe('handleLegend', () => {
  const area = new AreaCls();
  test('call it', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legendObject,
    };
    area.render(options, config);
    area.legend(legendObject.mapping);
  });

  test('call it without legends', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legendObject,
    };
    area.render(options, config);
    area.legend(undefined as any);
  });
});
