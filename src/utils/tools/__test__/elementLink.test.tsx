import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChartProps, ChartType } from '../../../interfaces';
import { ChartCom, chartComponentTestid } from '../../../core/__test__/framework.test';

import { FunnelWith6Columns } from '../../../funnel/demos/Funnel.stories';
import { getSingleData } from '../../../funnel/utils';
import { LegendObject } from '../../../legends/useLegends';
import { Funnel as FunnelCls } from '../../../funnel/framework';
import { addLinkByElement, addLinkByElementHigh } from '../elementLink';

const { config, legends: legendList, data: sourceData } = FunnelWith6Columns.args as ChartProps;
const data = getSingleData(sourceData);

const legendObject = new LegendObject({ type: ChartType.FUNNEL }, legendList as any);
const legends = legendObject.mapping;
describe('element-link', () => {
  const funnel = new FunnelCls();
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('addLinkByElement with delay 0', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legendObject,
    };
    funnel.render(options, config);
    const view = funnel.views?.[0];
    addLinkByElement(view, [], { delay: 0 });
  });

  test('addLinkByElement with empty view', () => {
    addLinkByElement(null as any, [], { delay: 0 });
  });

  test('addLinkByElement with delay 1', () => {
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    const options = {
      id: element,
      data,
      legends,
    };
    funnel.render(options, config);
    const view = funnel.views?.[0];
    const linkElement = addLinkByElementHigh();
    linkElement(view, { delay: -1 });
    linkElement(view, { delay: -1 });
  });
});
