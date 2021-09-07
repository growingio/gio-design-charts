import { getShapeConfig } from '../utils';

describe('test utils', () => {
  test('test getShapeConfig', () => {
    expect(getShapeConfig({ column: { test: 1 } })).toEqual({ test: 1 });
  });
});
