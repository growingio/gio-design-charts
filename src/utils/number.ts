/**
 * 23 => 30
 * 41 => 50
 * 123 => 200
 * 523 => 600
 * 1454 => 2000
 * 6531 => 7000
 * @param num
 * @returns
 */
export const integerCeil = (num: number) => {
  if (num < 100) {
    return Math.ceil(num / 10) * 10;
  }
  const fixed = 10 ** (String(num).length - 1);
  return Math.ceil(num / fixed) * fixed;
};
