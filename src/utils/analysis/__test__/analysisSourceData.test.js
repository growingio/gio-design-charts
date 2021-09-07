import { analysisSourceData } from '../analysisSourceData';
import activeMemberData from '../../../common/demos/usage/data/active-members.json';

describe('test format', () => {
  test('test analysisSourceData', () => {
    const covertData = analysisSourceData(activeMemberData, { chart: 'column', fetch: { type: '活跃人数' } });
    expect(covertData).toEqual([
      { tm: '1628870400000', NxDLPLD7: 793, type: '活跃人数' },
      { tm: '1628956800000', NxDLPLD7: 756, type: '活跃人数' },
      { tm: '1629043200000', NxDLPLD7: 1866, type: '活跃人数' },
      { tm: '1629129600000', NxDLPLD7: 483, type: '活跃人数' },
      { tm: '1629216000000', NxDLPLD7: 1381, type: '活跃人数' },
      { tm: '1629302400000', NxDLPLD7: 918, type: '活跃人数' },
      { tm: '1629388800000', NxDLPLD7: 1618, type: '活跃人数' },
    ]);
  });

  test('test analysisSourceData with formatter', () => {
    const covertData = analysisSourceData(activeMemberData, {
      chart: 'column',
      fetch: { type: '活跃人数' },
      formatter: (value) => {
        return value;
      },
    });
    expect(covertData).toEqual([
      { tm: 1628870400000, NxDLPLD7: 793, type: '活跃人数' },
      { tm: 1628956800000, NxDLPLD7: 756, type: '活跃人数' },
      { tm: 1629043200000, NxDLPLD7: 1866, type: '活跃人数' },
      { tm: 1629129600000, NxDLPLD7: 483, type: '活跃人数' },
      { tm: 1629216000000, NxDLPLD7: 1381, type: '活跃人数' },
      { tm: 1629302400000, NxDLPLD7: 918, type: '活跃人数' },
      { tm: 1629388800000, NxDLPLD7: 1618, type: '活跃人数' },
    ]);
  });
});
