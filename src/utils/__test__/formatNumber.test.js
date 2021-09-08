import { formatNumber, parseFormatedNumber, formatPercent, formatTemperature } from '../formatNumber';

describe('test format', () => {
  test('test formatNumber', () => {
    expect(formatNumber(20)).toBe('20');
    expect(formatNumber(123415454)).toBe('123,415,454');
    expect(formatNumber(123415454.23)).toBe('123,415,454.23');
  });

  test('test parseFormatedNumber', () => {
    expect(parseFormatedNumber('123,415,454.23')).toBe(123415454.23);
  });

  test('test formatPercent', () => {
    expect(formatPercent(0.2)).toBe('20%');
  });

  test('test formatTemperature', () => {
    expect(formatTemperature(20)).toBe('20 °C');
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
});
