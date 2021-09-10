import { renderHook, act } from '@testing-library/react-hooks';
import useOffset from '../useOffset';

describe('test useOffset', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('test useoffset hook', () => {
    const rootRef = { current: { offset: { width: 100, height: 200 } } };
    const { result } = renderHook(() => useOffset(rootRef as any));
    jest.runAllTimers();
    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 200 });
      global.innerWidth = 2000;
      global.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toEqual({});
  });
});
