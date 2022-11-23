import { COLOR_GRAY_1 } from '../../../theme';
import { getAreaShapeState, getBackgroundState, getPointShapeState, getShapeState } from '../shapeState';

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

describe('getPointShapeState', () => {
  test('call style function', () => {
    const state = getPointShapeState();
    expect(state.active).toBeTruthy();
    expect(state.active.style).toBeTruthy();

    const fakeElement = {
      getModel: jest.fn,
    } as any;
    const result = state.active.style(fakeElement);
    expect(result).toEqual({ stroke: '#fff' });

    const fakeElement2 = {
      getModel: () => ({ color: '#fff111' }),
    } as any;
    const result2 = state.active.style(fakeElement2);
    expect(result2).toEqual({ stroke: '#fff111' });

    const fakeElement3 = {
      getModel: () => ({ style: { fill: '#fff222' } }),
    } as any;
    const result3 = state.active.style(fakeElement3);
    expect(result3).toEqual({ stroke: '#fff222' });
  });
});

describe('getBackgroundState', () => {
  test('call getBackgroundState function', () => {
    const state = getBackgroundState();
    expect(state).toBeTruthy();
    expect(state.active).toBeTruthy();
    expect(state.active.style).toBeTruthy();

    const style = state.active.style();
    expect(style).toEqual({ stroke: COLOR_GRAY_1 });
  });
});
