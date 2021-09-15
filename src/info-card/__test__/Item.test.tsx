import React from 'react';
import { render, screen } from '@testing-library/react';
import Item from '../Item';

describe('Item', () => {
  const itemData = {};
  const itemTestid = 'legend-item';

  test('render Item', async () => {
    render(<Item data={itemData} forwardKey="color" valueKey="type" />);
    expect(await screen.findByTestId(itemTestid)).toBeTruthy();
  });

  test('render Item with empty data', async () => {
    render(<Item data={null as any} forwardKey="color" valueKey="type" />);
    expect(await screen.findByTestId(itemTestid)).toBeTruthy();
  });

  test('render Item with formatter', async () => {
    render(
      <Item
        data={{ ...itemData, data: { value: 100 } }}
        forwardKey="color"
        valueKey="type"
        formatter={(value: any) => {
          expect(value).toBe(100);
        }}
      />
    );
    expect(await screen.findByTestId(itemTestid)).toBeTruthy();
  });
});
