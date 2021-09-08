import { hasDodge } from '../interval';

describe('test Interval', () => {
  test('test adjust', () => {
    const config1 = {
      adjust: ['dodge'],
    };
    expect(hasDodge(config1)).toBeTruthy();

    const config2 = {
      adjust: { type: 'dodge' },
    };
    expect(hasDodge(config2)).toBeTruthy();
  });
});
