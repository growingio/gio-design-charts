import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChartProps } from '../../../interfaces';
import { ChartCom, chartComponentTestid } from '../../../core/__test__/framework.test';

import { FunnelWithLink } from '../../../funnel/demos/Funnel.stories';
import { getSingleData } from '../../../funnel/utils';
import { getLegends } from '../../../hooks/useLegends';
import { ChartType } from '../../..';
import { funnelChart } from '../../../funnel/framework';
import { addLinkByElement, addLinkByElementHigh } from '..';
import { View } from '@antv/g2';

const { config, legends: legendList, data: sourceData } = FunnelWithLink.args as ChartProps;
const data = getSingleData(sourceData);
const [legends] = getLegends(ChartType.FUNNEL, legendList);

describe('element-link', () => {
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
    const charts = funnelChart(options, config);
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
    const charts = funnelChart(options, config);
    const view = charts.views?.[0];
    const linkElement = addLinkByElementHigh();
    linkElement(view as View, { delay: -1 });
    linkElement(view as View, { delay: -1 });
  });
});
