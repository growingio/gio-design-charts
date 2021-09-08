import { renderHook, act } from '@testing-library/react-hooks';
import useInterceptors from '../useInterceptors';

describe('test useInterceptors', () => {
  test('test', () => {
    const { result } = renderHook(() => useInterceptors());
    const chartObj = {};
    act(() => {
      result.current.interceptors.onRender(chartObj);
    });
    expect(result.current.getCharts()).toEqual([chartObj]);
  });
});
