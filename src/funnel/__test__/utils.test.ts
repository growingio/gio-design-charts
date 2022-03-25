import { LooseObject } from '@antv/g-base';
import { convertSingleData1, covertData1, singleData, sourceData } from '../demos/data';
import { getGroupData, getSingleData } from '../utils';

describe('funnel utils', () => {
  const covertData = {
    source: sourceData,
    covert: covertData1,
    texts: [],
    isGroup: true,
  };

  test('getSingleData', () => {
    const convertSingleData = {
      source: singleData,
      covert: convertSingleData1,
      texts: ['0.00%', '0.00%'],
      elementCount: 3,
      isGroup: false,
    };
    expect(getSingleData(singleData as LooseObject[])).toEqual(convertSingleData);
  });

  test('getGroupData', () => {
    expect(getGroupData(sourceData as LooseObject[], { funnel: { color: 'city' } })).toEqual(covertData);
  });
});
