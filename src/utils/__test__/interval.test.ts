import { hasDodge, hasAdjust, getDodgeBy, hasContrastDodge } from '../interval';

describe('test hasDodge in Interval', () => {
  test('call adjust', () => {
    const config1 = {
      adjust: ['dodge'],
    };
    expect(hasDodge(config1)).toBeTruthy();

    const config2 = {
      adjust: { type: 'dodge' },
    };
    expect(hasDodge(config2 as any)).toBeTruthy();
  });
});

describe('test hasAdjust in Interval', () => {
  test('call hasAdjust without config', () => {
    expect(hasAdjust(null as any, 'dodge')).toBeFalsy();
  });

  test('call hasAdjust with null array', () => {
    expect(hasAdjust({ adjust: [null] } as any, 'dodge')).toBeFalsy();
  });

  test('call hasAdjust with adjust is null', () => {
    expect(hasAdjust({ adjust: null } as any, 'dodge')).toBeFalsy();
  });
});

describe('test getDodgeBy in Interval', () => {
  test('call getDodgeBy without config', () => {
    expect(getDodgeBy(null as any)).toBeFalsy();
  });

  test('call getDodgeBy with null array', () => {
    expect(getDodgeBy({ adjust: [null] } as any)).toBeFalsy();
  });
});

describe('test hasContrastDodge in Interval', () => {
  test('call hasContrastDodge without config', () => {
    expect(hasContrastDodge(null as any)).toBeFalsy();
  });
});
