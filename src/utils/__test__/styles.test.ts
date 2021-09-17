import { BAR_TEXTURE } from '../../theme';
import { getLegendStyles } from '../styles';

describe('test styles', () => {
  test('call getLegendStyles', () => {
    expect(getLegendStyles({ name: 'test' }, '#ccc')).toEqual({ backgroundColor: '#ccc' });
  });

  test('call getLegendStyles with dashed', () => {
    expect(getLegendStyles({ name: 'test', dashed: true }, '#ccc')).toEqual({
      backgroundImage: `url("${BAR_TEXTURE}")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '6px 6px',
      backgroundColor: '#ccc',
    });
  });

  test('call getLegendStyles with lineDash', () => {
    expect(getLegendStyles({ name: 'test', lineDash: true }, '#ccc')).toEqual({
      border: '1px dashed #ccc',
      height: 0,
      width: '12px',
    });
  });
});
