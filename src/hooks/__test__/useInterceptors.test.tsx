import { Chart } from '@antv/g2';
import { renderHook, act } from '@testing-library/react-hooks';
import EventEmitter from '@antv/event-emitter';
import useInterceptors from '../useInterceptors';

describe('test useInterceptors', () => {
  test('call interceptors onRender', () => {
    const { result } = renderHook(() => useInterceptors());
    const chartObj = {};
    act(() => {
      result.current.interceptors.onRender(chartObj as any);
    });
    expect(result.current.charts).toEqual([chartObj]);
  });

  test('call interceptors bindElementEvents', () => {
    const { result } = renderHook(() => useInterceptors());

    const chartObj = new EventEmitter();
    (chartObj as any).lockTooltip = jest.fn;
    (chartObj as any).unlockTooltip = jest.fn;
    act(() => {
      result.current.interceptors.bindElementEvents(chartObj as Chart);
    });

    act(() => {
      chartObj.emit('element:click');
    });
    expect(result.current.getTriggerAction()).toBe('click');

    act(() => {
      chartObj.emit('element:mouseover');
    });
    expect(result.current.getTriggerAction()).toBe('mouseover');

    act(() => {
      chartObj.emit('element:mouseout', { event: { relatedTarget: false } });
    });
    expect(result.current.getTriggerAction()).toBe('mouseover');

    act(() => {
      chartObj.emit('element:click');
    });
    expect(result.current.getTriggerAction()).toBe('click');

    act(() => {
      chartObj.emit('element:mouseout', { event: { relatedTarget: true } });
    });
    expect(result.current.getTriggerAction()).toBe('mouseover');
  });
});
