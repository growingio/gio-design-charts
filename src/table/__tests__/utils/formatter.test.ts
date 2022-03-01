import exp from 'constants';
import { clamp } from 'lodash';
import { parseNumberWithPrecision } from '../../utils/formatter'
describe('formatter', () => {
  it('parseNumberWithPrecision', () => {
    const n1 = parseNumberWithPrecision(6 / 10);
    expect(n1).toEqual(0.6);
    const n2 = parseNumberWithPrecision(6 * 0.1);
    expect(n2).toEqual(0.6000000000000001)
    expect(n2).not.toEqual(n1);
    expect(parseNumberWithPrecision(-6 * 0.1)).toBe(-0.6000000000000001)
  });
  function getIntervalScale(minValue = 0, maxValue = 0) {
    minValue = parseNumberWithPrecision(minValue);
    maxValue = parseNumberWithPrecision(maxValue);

    let realMin = 0;
    let distance = 1;
    const isPositive = minValue >= 0;
    const isNagative = maxValue <= 0;
    if (isPositive) /*全部为正数*/ {

      realMin = minValue;
      distance = maxValue - minValue || 1;

    } else if (isNagative) /*全部为负数*/ {
      distance = maxValue - minValue || 1;
      realMin = minValue;
    } else /*正负数混合*/ {
      distance = Math.max(Math.abs(maxValue), Math.abs(minValue));
      realMin = 0;
    }
    return (current: number) =>
      // max percentage shouldn't be greater than 100%
      // min percentage shouldn't be less than 0%
      clamp((current - realMin) / distance, -1, 1);
  }
  it('getIntervalScale', () => {
    const scale = getIntervalScale(-20, 100);
    console.log(scale(-100));
    console.log(scale(100))
    console.log(scale(-20))
    console.log(scale(50));
    console.log(scale(0))
    console.log(scale(-999))

    const scale2 = getIntervalScale(10, 110);
    console.log(scale2(10));
    console.log(scale2(100))
    console.log(scale2(110))
    console.log(scale2(50));
    console.log(scale2(0))
    console.log(scale2(999))

    const scale3 = getIntervalScale(100, 100);
    console.log(scale3(200));
    console.log(scale3(100));
    console.log(scale3(0));
  })
})