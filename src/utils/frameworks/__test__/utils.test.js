import {
  getDefaultStyles,
  getRelateLegend,
  getShapeConfig,
  isStack,
  isTopBar,
  isUseDash,
  setCustomInfo,
} from '../utils';

describe('getShapeConfig', () => {
  test('call it', () => {
    expect(getShapeConfig({ column: { test: 1 } })).toEqual({ test: 1 });
  });

  test('with empty', () => {
    expect(getShapeConfig({})).toEqual({});
  });
});

describe('setCustomInfo', () => {
  test('with empty', () => {
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
  test('with empty', () => {
    expect(getRelateLegend({})).toEqual({});
  });
});

describe('getDefaultStyles', () => {
  test('with empty', () => {
    expect(getDefaultStyles()).toEqual({});
    expect(getDefaultStyles({})).toEqual({});
  });
});

describe('isUseDash', () => {
  test('with empty', () => {
    expect(isUseDash()).toBeFalsy;
    expect(isUseDash({})).toBeFalsy;
  });
});

describe('isStack', () => {
  test('with empty', () => {
    expect(isStack()).toBeFalsy;
    expect(isStack({})).toBeFalsy;
  });
});

describe('isTopBar', () => {
  test('with empty', () => {
    expect(isTopBar()).toBeFalsy;
    expect(isTopBar({})).toBeFalsy;
  });
});
