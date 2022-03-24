import { renderHook, act } from '@testing-library/react-hooks';
import useLegends, { getLegends } from '../useLegends';
import { ChartType, Legends } from '../../interfaces';

describe('test useLegends', () => {
  const testLegends = {
    北京: { name: '北京', color: '#5F87FF', active: true, type: 'bar' },
    上海: { name: '上海', color: '#FFDD63', active: true, type: 'bar' },
  };

  const lineDashLgends = {
    南京: {
      name: '南京',
      lineDash: [1, 2, 3],
      color: '#62CE6C',
      active: true,
      type: 'bar',
    },
  };
  const fullLegends = { ...testLegends, ...lineDashLgends };
  test('call getLegends', () => {
    const [legends, , hasDashed] = getLegends(ChartType.BAR, [
      '北京',
      { name: '上海' },
      { name: '南京', lineDash: [1, 2, 3] },
    ]);
    expect(legends).toEqual(fullLegends);
    expect(hasDashed).toBeFalsy();

    const [nullLegends] = getLegends(ChartType.COLUMN, undefined as any);
    expect(nullLegends).toEqual({});
  });

  test('call useLegends hook', () => {
    const { result } = renderHook(() => useLegends());

    act(() => {
      result.current.setLegends(fullLegends as Legends, [], false);
    });
    expect(result.current.legends).toEqual(fullLegends);

    act(() => {
      result.current.updateLegends('南京');
    });
    expect(result.current.legends).toEqual({ ...testLegends, 南京: { ...lineDashLgends['南京'], active: false } });

    // if the legends is empty object {}
    act(() => {
      result.current.setLegends({}, [], false);
    });
    act(() => {
      result.current.updateLegends('南京');
    });
    expect(result.current.legends).toEqual({
      南京: {
        active: true,
      },
    });

    // if the legends is undefined
    act(() => {
      result.current.setLegends(undefined as any, [], false);
    });
    act(() => {
      result.current.updateLegends('南京');
    });
    expect(result.current.legends).toEqual({
      南京: {
        active: true,
      },
    });
  });
});
