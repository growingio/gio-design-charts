import { ChartType } from '../../interfaces';
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

  test('call with hidden legend', () => {
    const legendObj = new LegendObject({ type: ChartType.LINE }, [
      '北京',
      { name: '上海', hidden: true },
      { name: '南京', lineDash: [1, 2, 3] },
    ]);
    // hidden 的图例仍保留在 mapping 中，图形颜色与图例点击联动不受影响
    expect(legendObj.mapping['上海']).toEqual({
      name: '上海',
      color: '#FFDD63',
      active: true,
      type: ChartType.LINE,
      hidden: true,
    });
    // 但不会出现在渲染队列中
    expect(legendObj.queue.map((legend) => legend.name)).toEqual(['北京', '南京']);
    expect(legendObj.support).toBeTruthy();

    legendObj.update('北京');
    expect(legendObj.mapping['上海'].active).toBeTruthy();
    expect(legendObj.queue.map((legend) => legend.name)).toEqual(['北京', '南京']);
  });

  test('call with all legends hidden', () => {
    const legendObj = new LegendObject({ type: ChartType.LINE }, [
      { name: '北京', hidden: true },
      { name: '上海', hidden: true },
    ]);
    expect(Object.keys(legendObj.mapping)).toEqual(['北京', '上海']);
    expect(legendObj.queue).toEqual([]);
    // 没有需要渲染的图例时，不占用图例区域高度
    expect(legendObj.support).toBeFalsy();
  });
});
