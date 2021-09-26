import React from 'react';
import { render, screen } from '@testing-library/react';
import { Area } from '../../area';
import { AreaStack } from '../../area/demos/Area.stories';
import { AreaProps } from '../../area/Area';

const noDataTestId = 'no-data';
describe('No Data', () => {
  test('default', () => {
    render(<Area {...(AreaStack.args as AreaProps)} data={[]} />);
    expect(screen.getByTestId(noDataTestId)).toBeTruthy();
  });

  test('custom', () => {
    render(
      <Area {...(AreaStack.args as AreaProps)} data={[]} noData={() => <div data-testid="custom-no-data">Test</div>} />
    );
    expect(screen.getByTestId('custom-no-data')).toBeTruthy();
  });
});
