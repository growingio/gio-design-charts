import { renderHook, act } from '@testing-library/react-hooks';
import EventEmitter from '@antv/event-emitter';
import useInterceptors from '../useInterceptors';

describe('test useInterceptors', () => {
  test('call interceptors bindElementEvents', () => {
    const { result } = renderHook(() => useInterceptors());

    const chartObj = new EventEmitter();
    (chartObj as any).lockTooltip = jest.fn;
    (chartObj as any).unlockTooltip = jest.fn;
    act(() => {
      result.current.interceptors?.bindElementEvents(chartObj as any);
    });

    act(() => {
      chartObj.emit('element:click', { event: { relatedTarget: true } });
    });
    expect(result.current.getTrigger().type).toBe('click');

    act(() => {
      chartObj.emit('element:mouseover', { event: { relatedTarget: true } });
    });
    expect(result.current.getTrigger().type).toBe('mouseover');

    act(() => {
      chartObj.emit('element:mouseout', { event: { relatedTarget: false } });
    });
    expect(result.current.getTrigger().type).toBe('mouseover');

    act(() => {
      chartObj.emit('element:click', { event: { relatedTarget: true } });
    });
    expect(result.current.getTrigger().type).toBe('click');

    act(() => {
      chartObj.emit('element:mouseout', { event: { relatedTarget: true } });
    });
    expect(result.current.getTrigger().type).toBe('mouseover');
  });
});
