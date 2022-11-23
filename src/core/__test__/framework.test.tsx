import React, { RefObject } from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';

import { PercentArea } from '../../area/demos/Area.stories';
import { Area } from '../../area';
import { AreaProps } from '../../area/Area';
import { IntlProvider } from 'react-intl';

export const chartComponentTestid = 'chart-component';
export const ChartCom = () => {
  const rootRef: RefObject<HTMLDivElement> = React.createRef();
  return (
    <IntlProvider locale="zh-CH" messages={{}}>
      <div ref={rootRef} data-testid={chartComponentTestid} />
    </IntlProvider>
  );
};

describe('common', () => {
  test('default', () => {
    render(<Area {...(PercentArea.args as AreaProps)} />);

    const testid = 'legend-item-步步盈增｜北京';
    const legend = screen.getByTestId(testid);
    expect(legend).toBeTruthy();

    const clickLegendEvent = createEvent.click(legend);
    fireEvent(legend, clickLegendEvent);
  });
});
