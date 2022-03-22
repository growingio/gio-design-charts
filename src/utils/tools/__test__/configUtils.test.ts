import { Point } from '@antv/component';
import { ShapeInfo } from '@antv/g2/lib/interface';
import { getDefaultStyles, getRelateLegend, isStack, isTopBar, isUseDash, setCustomInfo } from '../configUtils';

import { getShapeConfig } from '../shapeConfig';

describe('getShapeConfig', () => {
  test('call it', () => {
    expect(getShapeConfig({ column: { test: 1 } })).toEqual({ test: 1 });
  });

  test('with empty for getShapeConfig', () => {
    expect(getShapeConfig({})).toEqual({});
  });
});

describe('setCustomInfo', () => {
  test('with empty for setCustomInfo', () => {
    expect(setCustomInfo({})).toEqual({
      contrastDodge: false,
      defaultStyles: undefined,
      dodgeBy: undefined,
      legends: undefined,
      type: undefined,
    });
  });

  test('with isStack', () => {
    expect(setCustomInfo({}, {}, { isStack: true })).toEqual({
      contrastDodge: false,
      defaultStyles: undefined,
      isStack: true,
      topData: undefined,
      dodgeBy: undefined,
      legends: undefined,
      type: undefined,
    });
  });
});

describe('getRelateLegend', () => {
  test('with empty for getRelateLegend', () => {
    expect(getRelateLegend({} as Point)).toEqual({});
  });
});

describe('getDefaultStyles', () => {
  test('with empty for getDefaultStyles', () => {
    expect(getDefaultStyles(undefined as any)).toEqual({});
    expect(getDefaultStyles({} as Point)).toEqual({});
  });
});

describe('isUseDash', () => {
  test('with undefined', () => {
    expect(isUseDash(undefined as any)).toBeFalsy();
    expect(isUseDash({} as Point)).toBeFalsy();
  });
});

describe('isStack', () => {
  test('with empty for isStack', () => {
    expect(isStack(undefined as any)).toBeFalsy();
    expect(isStack({} as Point)).toBeFalsy();
  });
});

describe('isTopBar', () => {
  test('with empty for isTopBar', () => {
    expect(isTopBar(undefined as any)).toBeTruthy();
    expect(isTopBar({} as ShapeInfo)).toBeTruthy();
  });
});
