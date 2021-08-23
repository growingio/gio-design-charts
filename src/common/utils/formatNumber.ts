export const formatNumber = (value: any, decimalCount: number = 2, intSuffixZeroFill: boolean = false) => {
  if (!isFinite(value)) {
    return value + '';
  }
  if (typeof value === 'string' && value.endsWith('%')) {
    return value;
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
  const valueStr = (intValue + parseFloat(decimalValueStr)).toFixed(decimalCount) + '';
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
      ? '.' + '0'.repeat(decimalCount)
      : '';
  let intPart = result.slice(0, result.indexOf('.') >= 0 ? result.indexOf('.') : result.length);
  intPart = intPart
    .split('')
    .map((i, index) => {
      const dotIndex = intPart.length - index - 1;
      return dotIndex % 3 === 0 && dotIndex !== 0 ? i + ',' : i;
    })
    .join('');
  return sign + intPart + decimalPart;
};

export default formatNumber;
export const parseFormatedNumber = (text: string) =>
  parseFloat(
    text
      .split('')
      .filter((c) => c !== ',')
      .join('')
  );
export const formatPercent = (value: string | number, decimalCount?: number, intSuffixZeroFill: boolean = true) =>
  typeof value === 'number' ? formatNumber((value || 0) * 100, decimalCount, intSuffixZeroFill) + '%' : value;

// console.log(formatNumber(0, 0))
// console.log(formatNumber(0.01, 0))
