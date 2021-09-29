import { getAreaShapeState, getShapeState } from '../shapeState';

describe('getShapeState', () => {
  test('call getShapeState', () => {
    const state = getShapeState({} as any);

    const styles = state.active.style({} as any);
    expect(styles).toEqual({
      lineWidth: 2,
      stroke: '#000',
      strokeOpacity: 0.5,
    });
  });

  test('call getShapeState 2', () => {
    const state = getShapeState({ defaultStyles: { color: '#fff' } } as any);

    const styles = state.active.style({
      getModel: () => {
        return { style: { fill: '#cccccc' }, fill: '#dddddd' };
      },
    } as any);
    expect(styles).toEqual({
      lineWidth: 2,
      stroke: '#fff',
      strokeOpacity: 0.5,
    });
  });
});

describe('getAreaShapeState', () => {
  test('call getAreaShapeState', () => {
    const state = getAreaShapeState();
    const styles = state.active.style({} as any);
    expect(styles).toEqual({
      lineWidth: 2,
      fill: '#fff',
      strokeOpacity: 1,
    });
  });

  test('call getAreaShapeState 2', () => {
    const state = getAreaShapeState();

    const styles = state.active.style({
      getModel: () => {
        return { style: { fill: '#cccccc' }, fill: '#dddddd' };
      },
    } as any);
    expect(styles).toEqual({
      lineWidth: 2,
      fill: '#cccccc',
      strokeOpacity: 1,
    });
  });
});
