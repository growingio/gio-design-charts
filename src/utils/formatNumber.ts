// 1233123  ==> 1,233,123
// 12155123.12 ==> 12,155,123.12
export const formatNumber = (value: any, decimalCount = 2, intSuffixZeroFill = false) => {
  if (!isFinite(value)) {
    return value + '';
  }

  let sign = '';
  if (Number(value) < 0) {
    sign = '-';
    value = Number(value) * -1;
  }

  value = value || 0;
  const intValue = parseInt(value + '', 10);
  const decimalValue = value - intValue;
  let decimalValueStr;
  if (intValue === 0 && decimalCount > 0) {
    decimalValueStr = decimalValue.toPrecision(decimalCount);
  } else {
    decimalValueStr = decimalValue.toFixed(decimalCount);
  }
  const result = String(Number((intValue + parseFloat(decimalValueStr)).toFixed(decimalCount)));

  const fillStr = intSuffixZeroFill ? '.' + '0'.repeat(decimalCount) : '';
  const decimalPart = result.indexOf('.') >= 0 ? result.slice(result.indexOf('.')) : fillStr;

  let intPart = result.slice(0, result.indexOf('.') >= 0 ? result.indexOf('.') : result.length);
  intPart = intPart
    .split('')
    .map((char, index) => {
      const dotIndex = intPart.length - index - 1;
      return dotIndex % 3 === 0 && dotIndex !== 0 ? char + ',' : char;
    })
    .join('');
  return sign + intPart + decimalPart;
};

// 1,233,123  ==> 1233123
export const parseFormatedNumber = (text: string) => parseFloat(text.replace(/\,/g, ''));

// 12   ==> 12%
// 12.3 ==> 12.3%
export const formatPercent = (value: string | number, decimalCount?: number, intSuffixZeroFill = false) =>
  typeof value === 'number' ? formatNumber((value || 0) * 100, decimalCount, intSuffixZeroFill) + '%' : value;

// 12   ==> 12 °C
// 12.3 ==> 12.3 °C
export const formatTemperature = (value: string | number, decimalCount?: number, intSuffixZeroFill = false) =>
  typeof value === 'number' ? formatNumber(value, decimalCount, intSuffixZeroFill) + ' °C' : value;

export default formatNumber;
