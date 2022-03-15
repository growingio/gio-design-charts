import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChartProps, ChartType } from '../../../interfaces';
import { ChartCom, chartComponentTestid } from '../../../core/__test__/framework.test';

import { FunnelWith6Columns } from '../../../funnel/demos/Funnel.stories';
import { getSingleData } from '../../../funnel/utils';
import { getLegends } from '../../../hooks/useLegends';
import { Funnel as FunnelCls } from '../../../funnel/framework';
import { addLinkByElement, addLinkByElementHigh } from '../elementLink';
import { View } from '@antv/g2';

const { config, legends: legendList, data: sourceData } = FunnelWith6Columns.args as ChartProps;
const data = getSingleData(sourceData);
const [legends] = getLegends(ChartType.FUNNEL, legendList as any);

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
      legends,
    };
    const charts = funnel.render(options, config);
    const view = charts.views?.[0];
    addLinkByElement(view as View, [], { delay: 0 });
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
    const charts = funnel.render(options, config);
    const view = charts.views?.[0];
    const linkElement = addLinkByElementHigh();
    linkElement(view as View, { delay: -1 });
    linkElement(view as View, { delay: -1 });
  });
});
