import { formatNumber, parseFormatedNumber, formatPercent, formatTemperature } from '../formatNumber';

describe('test formatNumber', () => {
  test('formatNumber', () => {
    expect(formatNumber(20)).toBe('20');
    expect(formatNumber(123415454)).toBe('123,415,454');
    expect(formatNumber(123415454.23)).toBe('123,415,454.23');
    expect(formatNumber(123415454.23232332)).toBe('123,415,454.23');
    expect(formatNumber(0.23232332)).toBe('0.23');
  });

  test('formatNumber decimalCount', () => {
    expect(formatNumber(0.23, 0)).toBe('0');
    expect(formatNumber(0.26123123, 1)).toBe('0.3');
    expect(formatNumber(123415454.23, 0)).toBe('123,415,454');
    expect(formatNumber(123415454.6, 0)).toBe('123,415,455');
  });

  test('formatNumber decimalCount intSuffixZeroFill', () => {
    expect(formatNumber(0.6, 3, true)).toBe('0.6');
    expect(formatNumber(123415454.6, 3, true)).toBe('123,415,454.6');
    expect(formatNumber(0, 3, true)).toBe('0.000');
    expect(formatNumber(123415454, 3, true)).toBe('123,415,454.000');
  });

  test('formatNumber with finite value', () => {
    expect(formatNumber(Infinity)).toEqual('Infinity');
  });

  test('formatNumber with percent', () => {
    expect(formatNumber('30%')).toEqual('30%');
  });

  test('formatNumber with -', () => {
    expect(formatNumber(-1234)).toEqual('-1,234');
  });

  test('formatNumber with demical number', () => {
    expect(formatNumber(0)).toEqual('0');
  });

  test('formatNumber with more settings', () => {
    expect(formatNumber(0, 3, true)).toEqual('0.000');
  });
});

describe('test formatTemperature', () => {
  test('formatTemperature', () => {
    expect(formatTemperature(20)).toBe('20 °C');
  });

  test('formatTemperature with empty', () => {
    expect(formatTemperature('')).toBe('0 °C');
  });

  test('formatTemperature with more settings', () => {
    expect(formatTemperature(0.2, 3, true)).toBe('0.2 °C');
  });

  test('formatTemperature with string', () => {
    expect(formatTemperature('20 °C')).toBe('20 °C');
  });
});

describe('test formatPercent', () => {
  test('formatPercent', () => {
    expect(formatPercent(0.2)).toBe('20%');
  });

  test('formatPercent with more settings', () => {
    expect(formatPercent(0.2, 3, true)).toBe('20.000%');
  });

  test('formatPercent with string', () => {
    expect(formatPercent('20%')).toBe('20%');
  });

  test('formatPercent with NaN', () => {
    expect(formatPercent(NaN)).toBe('0%');
  });
});

describe('test parseFormatedNumber', () => {
  test('parseFormatedNumber', () => {
    expect(parseFormatedNumber('123,415,454.23')).toBe(123415454.23);
  });
});
