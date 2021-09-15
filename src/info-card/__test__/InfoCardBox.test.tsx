import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoCardBox from '../InfoCardBox';
import { legends, triggerItems, options, config } from './InfoCard.test';

const trigger = 'mouseover';
const infoCardBoxTestid = 'infoCardBox';

describe('props triggerItems in InforCardBox', () => {
  test('render InfoCardBox with empty triggerItems', async () => {
    render(
      <InfoCardBox triggerItems={null as any} legends={legends} trigger={trigger} options={options} config={config} />
    );
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });

  test('render InfoCardBox with first data is undefined in triggerItems', async () => {
    render(
      <InfoCardBox triggerItems={[undefined]} legends={legends} trigger={trigger} options={options} config={config} />
    );
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });

  test('render InfoCardBox with first data is empty in triggerItems', async () => {
    render(<InfoCardBox triggerItems={[{}]} legends={legends} trigger={trigger} options={options} config={config} />);
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });
});

describe('props options.defaultStyles in InforCardBox', () => {
  test('render InfoCardBox with empty options', async () => {
    render(<InfoCardBox triggerItems={triggerItems} legends={legends} trigger={trigger} config={config} />);
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });

  test('render InfoCardBox with empty options.defaultStyles', async () => {
    render(<InfoCardBox triggerItems={triggerItems} legends={null as any} trigger={trigger} config={config} />);
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });
});

describe('props legends in InforCardBox', () => {
  test('render InfoCardBox with empty legends', async () => {
    render(
      <InfoCardBox
        triggerItems={triggerItems}
        legends={undefined as any}
        trigger={trigger}
        options={options}
        config={config}
      />
    );
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });

  test('render InfoCardBox with different legends', async () => {
    const newLegends = { 深圳: { name: '深圳' } };
    render(
      <InfoCardBox
        triggerItems={triggerItems}
        legends={newLegends}
        trigger={trigger}
        options={options}
        config={config}
      />
    );
    expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  });
});
