import { renderHook, act } from '@testing-library/react-hooks';
// import useLegends, { getLegends } from '../useLegends';
import { ChartType, Legends } from '../../interfaces';
import { LegendObject } from '../../legends/useLegends';

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
    const legendObj = new LegendObject({ type: ChartType.BAR }, [
      '北京',
      { name: '上海' },
      { name: '南京', lineDash: [1, 2, 3] },
    ]);
    expect(legendObj.mapping).toEqual(fullLegends);
    expect(legendObj.hasDashed).toBeFalsy();

    const legendObj2 = new LegendObject({ type: ChartType.COLUMN }, undefined as any);
    expect(legendObj2.mapping).toEqual({});
  });
});
