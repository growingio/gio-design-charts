import { Legend } from '../interfaces';
import { BAR_TEXTURE } from '../theme';

export const getBackgroundImage = () => ({
  backgroundImage: `url("${BAR_TEXTURE}")`,
  backgroundRepeat: 'repeat',
  backgroundSize: '6px 6px',
});

export const getLegendStyles = (legend: Legend, color: string) => {
  const { lineDash, dashed } = legend;
  const backgroundImage = dashed ? getBackgroundImage() : {};
  return lineDash
    ? {
        border: `1px dashed ${color}`,
        height: 0,
        width: '12px',
        ...backgroundImage,
      }
    : { backgroundColor: color, ...backgroundImage };
};
