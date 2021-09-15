import React, { LegacyRef } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { ChartProps } from '../../interfaces';
import { areaChart, handleLegend } from '../../area/framework';
import { AreaWithSample } from '../../area/demos/Area.stories';
import { LegendLayout } from '../../layouts';
import useOffset from '../useOffset';

const legendLayoutTestid = 'legend-layout';

describe('useOffset hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('useOffset hook', () => {
    const rootRef = { current: { offset: { width: 100, height: 200 } } };
    const { result } = renderHook(() => useOffset(rootRef as any));
    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 200 });

      rootRef.current.offset.width = 200;
      global.innerWidth = 2000;
      global.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toEqual({});
  });

  test('use useOffset without watchReset', () => {
    const useOffsetComTestId = 'use-offset-com';
    const UseOffsetCom = () => {
      const rootRef: LegacyRef<HTMLDivElement> = React.createRef();

      useOffset(rootRef);
      return <div ref={rootRef} data-testid={useOffsetComTestId} />;
    };
    render(<UseOffsetCom />);
    const element = screen.getByTestId(useOffsetComTestId);
    jest.runAllTimers();
    act(() => {
      // offsetWidth是只读元素，通过Object.defineProperty进行修改元素的值
      Object.defineProperty(element, 'offsetWidth', { writable: true, configurable: true, value: 200 });
      global.innerWidth = 2000;
      global.dispatchEvent(new Event('resize'));
      Object.defineProperty(element, 'offsetWidth', { writable: true, configurable: true, value: 300 });
      global.innerWidth = 3000;
      global.dispatchEvent(new Event('resize'));
    });
  });
});
