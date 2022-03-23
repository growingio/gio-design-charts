import { integerCeil } from '../number';

describe('integerCeil', () => {
  test('call integerCeil', () => {
    expect(integerCeil(27)).toBe(30);

    expect(integerCeil(110)).toBe(110);
    expect(integerCeil(111)).toBe(120);
  });
});
