// 1233123  ==> 1,233,123
// 12155123.12 ==> 12,155,123.12
export const formatNumber = (value: number | string, decimalCount = 2, intSuffixZeroFill = false) => {
  if (!isFinite(value as number)) {
    return value || '';
  }

  let sign = '';
  if (Number(value) < 0) {
    sign = '-';
    value = Number(value) * -1;
  }

  value = value || 0;
  const intValue = parseInt(value + '', 10);
  const decimalValue = (value as number) - intValue;
  let decimalValueStr;
  let valueStr = value;

  if (intValue === 0 && decimalCount > 0) {
    decimalValueStr = decimalValue.toPrecision(decimalCount);
    valueStr = `${intValue + parseFloat(decimalValueStr)}`;
  } else {
    decimalValueStr = decimalValue.toFixed(decimalCount);
    valueStr = `${(intValue + parseFloat(decimalValueStr)).toFixed(decimalCount)}`;
  }

  let i = valueStr.length - 1;
  if (valueStr.indexOf('.') >= 0) {
    while (i >= 0 && (valueStr[i] === '.' || valueStr[i] === '0')) {
      i--;
      if (valueStr[i] === '.') {
        i--;
        break;
      }
    }
  }

  const result = valueStr.slice(0, i + 1);
  const decimalPart =
    result.indexOf('.') >= 0
      ? result.slice(result.indexOf('.'))
      : intSuffixZeroFill
      ? `.${'0'.repeat(decimalCount)}`
      : '';
  let intPart = result.slice(0, result.indexOf('.') >= 0 ? result.indexOf('.') : result.length);
  intPart = intPart
    .split('')
    .map((i, index) => {
      const dotIndex = intPart.length - index - 1;
      return dotIndex % 3 === 0 && dotIndex !== 0 ? `${i},` : i;
    })
    .join('');

  return sign + intPart + decimalPart;
};

// 1,233,123  ==> 1233123
export const parseFormatedNumber = (text: string) => parseFloat(text.replace(/,/g, ''));

// 12   ==> 12%
// 12.3 ==> 12.3%
export const formatPercent = (value: string | number, decimalCount?: number, intSuffixZeroFill = false) => {
  if (!value) {
    return '0%';
  }
  return !isNaN(Number(value))
    ? formatNumber((Number(value) || 0) * 100, decimalCount, intSuffixZeroFill) + '%'
    : value;
};

// 12   ==> 12 °C
// 12.3 ==> 12.3 °C
export const formatTemperature = (value: string | number, decimalCount?: number, intSuffixZeroFill = false) => {
  if (!value) {
    return '0 °C';
  }
  return !isNaN(Number(value)) ? formatNumber(Number(value), decimalCount, intSuffixZeroFill) + ' °C' : value;
};

export default formatNumber;
