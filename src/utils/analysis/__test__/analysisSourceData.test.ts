import { analysisSourceData } from '../analysisSourceData';
import activeMemberData from '../../../demos/usage/data/active-members.json';
import { AnalysisOptions } from '..';

describe('test format', () => {
  const expectDataWithStringTs = [
    { tm: '1628870400000', NxDLPLD7: 793, type: '活跃人数' },
    { tm: '1628956800000', NxDLPLD7: 756, type: '活跃人数' },
    { tm: '1629043200000', NxDLPLD7: 1866, type: '活跃人数' },
    { tm: '1629129600000', NxDLPLD7: 483, type: '活跃人数' },
    { tm: '1629216000000', NxDLPLD7: 1381, type: '活跃人数' },
    { tm: '1629302400000', NxDLPLD7: 918, type: '活跃人数' },
    { tm: '1629388800000', NxDLPLD7: 1618, type: '活跃人数' },
  ];

  const expectDataWithNumberTs = [
    { tm: 1628870400000, NxDLPLD7: 793, type: '活跃人数' },
    { tm: 1628956800000, NxDLPLD7: 756, type: '活跃人数' },
    { tm: 1629043200000, NxDLPLD7: 1866, type: '活跃人数' },
    { tm: 1629129600000, NxDLPLD7: 483, type: '活跃人数' },
    { tm: 1629216000000, NxDLPLD7: 1381, type: '活跃人数' },
    { tm: 1629302400000, NxDLPLD7: 918, type: '活跃人数' },
    { tm: 1629388800000, NxDLPLD7: 1618, type: '活跃人数' },
  ];

  const expectDataWithNumberTsWithoutType = [
    { tm: 1628870400000, NxDLPLD7: 793 },
    { tm: 1628956800000, NxDLPLD7: 756 },
    { tm: 1629043200000, NxDLPLD7: 1866 },
    { tm: 1629129600000, NxDLPLD7: 483 },
    { tm: 1629216000000, NxDLPLD7: 1381 },
    { tm: 1629302400000, NxDLPLD7: 918 },
    { tm: 1629388800000, NxDLPLD7: 1618 },
  ];
  test('test analysisSourceData', () => {
    const covertData = analysisSourceData(activeMemberData, {
      chart: 'column',
      fetch: { type: '活跃人数' },
    } as AnalysisOptions);
    expect(covertData).toEqual(expectDataWithStringTs);
  });

  test('test analysisSourceData with formatter', () => {
    const covertData = analysisSourceData(activeMemberData, {
      chart: 'column',
      fetch: { type: '活跃人数' },
      formatter: (value: string) => {
        return value;
      },
    });
    expect(covertData).toEqual(expectDataWithNumberTs);
  });

  test('test analysisSourceData without options', () => {
    const covertData = analysisSourceData(activeMemberData);
    expect(covertData).toEqual(expectDataWithNumberTsWithoutType);
  });

  test('test analysisSourceData with empty data', () => {
    expect(analysisSourceData({})).toEqual([]);
  });

  test('test analysisSourceData with null data', () => {
    expect(analysisSourceData(null as any)).toEqual([]);
  });

  test('test analysisSourceData with falsy data', () => {
    expect(analysisSourceData({ data: [undefined] })).toEqual([{}]);
  });

  test('test analysisSourceData with falsy column', () => {
    expect(analysisSourceData({ data: [undefined], meta: { columns: [{}] } })).toEqual([{ undefined: undefined }]);
  });
});