import { formatNumber, parseFormatedNumber, formatPercent, formatTemperature } from '../formatNumber';

describe('test formatNumber', () => {
  test('test formatNumber', () => {
    expect(formatNumber(20)).toBe('20');
    expect(formatNumber(123415454)).toBe('123,415,454');
    expect(formatNumber(123415454.23)).toBe('123,415,454.23');
  });

  test('test formatNumber with finite value', () => {
    expect(formatNumber(Infinity)).toEqual('Infinity');
  });

  test('test formatNumber with percent', () => {
    expect(formatNumber('30%')).toEqual('30%');
  });

  test('test formatNumber with -', () => {
    expect(formatNumber(-1234)).toEqual('-1,234');
  });

  test('test formatNumber with demical number', () => {
    expect(formatNumber(0)).toEqual('0');
  });

  test('test formatNumber with more settings', () => {
    expect(formatNumber(0, 3, true)).toEqual('0.000');
  });
});

describe('test formatTemperature', () => {
  test('test formatTemperature', () => {
    expect(formatTemperature(20)).toBe('20 °C');
  });

  test('test formatTemperature with more settings', () => {
    expect(formatTemperature(0.2, 3, true)).toBe('0.2 °C');
  });

  test('test formatTemperature with string', () => {
    expect(formatTemperature('20 °C')).toBe('20 °C');
  });
});

describe('test formatPercent', () => {
  test('test formatPercent', () => {
    expect(formatPercent(0.2)).toBe('20%');
  });

  test('test formatPercent with more settings', () => {
    expect(formatPercent(0.2, 3, true)).toBe('20.000%');
  });

  test('test formatPercent with string', () => {
    expect(formatPercent('20%')).toBe('20%');
  });

  test('test formatPercent with NaN', () => {
    expect(formatPercent(NaN)).toBe('0%');
  });
});

describe('test parseFormatedNumber', () => {
  test('test parseFormatedNumber', () => {
    expect(parseFormatedNumber('123,415,454.23')).toBe(123415454.23);
  });
});
