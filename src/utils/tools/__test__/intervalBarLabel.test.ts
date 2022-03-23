import { Geometry } from '@antv/g2';
import IntervalBarLabel from '../intervalBarLabel';

describe('IntervalBarLabel', () => {
  test('IntervalBarLabel class', () => {
    const label = new IntervalBarLabel(new Geometry({ coordinate: {} } as any));
    const labelConfig = { offset: 10 } as any;
    const index = 1;
    const total = 100;
    const point = label.getLabelOffsetPoint(labelConfig, index, total);
    expect(point).toEqual({ x: 0, y: -10 });
  });
});
