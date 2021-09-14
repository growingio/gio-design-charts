import React, { RefObject } from 'react';
import { render, screen } from '@testing-library/react';

import { areaChart, handleLegend } from '../areaChart';
import { AreaWithSample } from '../../components/area/demos/Area.stories';
import { ChartProps, ChartType } from '../../interface';
import { getLegends } from '../../components/hooks/useLegends';
import { DEFAULT_LINEDASH } from '../../theme';
import { Chart } from '@antv/g2';

const chartComponentTestid = 'chart-component';
const AreaCom = () => {
  const rootRef: RefObject<HTMLDivElement> = React.createRef();
  return <div ref={rootRef} data-testid={chartComponentTestid} />;
};

const { config, legends: legendList, data } = AreaWithSample.args as ChartProps;
const [legends] = getLegends(ChartType.AREA, legendList);
describe('areaChart', () => {
  test('call areaChart', () => {
    render(<AreaCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    areaChart(options, config);
  });

  test('call areaChart with lineDash', () => {
    render(<AreaCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends: { 北京: { name: '北京', color: '#5F87FF', active: true, type: 'area', lineDash: DEFAULT_LINEDASH } },
    };
    areaChart(options, config);
  });
  test('call areaChart without legends', () => {
    render(<AreaCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
    };
    areaChart(options, config);
  });
  test('call areaChart without config', () => {
    render(<AreaCom />);
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
    render(<AreaCom />);
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
    render(<AreaCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    const { chart } = areaChart(options, config);
    handleLegend([chart as Chart], legends, {});
  });
});
