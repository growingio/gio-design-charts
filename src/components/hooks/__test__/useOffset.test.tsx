import { renderHook, act } from '@testing-library/react-hooks';
import useOffset from '../useOffset';

describe('test useOffset', () => {
  test('test useoffset hook', () => {
    const rootRef = { current: { offset: { width: 100, height: 200 } } };
    const { result } = renderHook(() => useOffset(rootRef as any));
    jest.runAllTimers();
    act(() => {
      console.log(result.current);
    });
  });
});
