import { GeometryLabel } from '@antv/g2';
import { LabelCfg } from '@antv/g2/lib/geometry/label/interface';
import { get } from 'lodash';
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_FAMILY, FONT_SIZE_12 } from '../../theme';

const getTextWidth = (text: string) => {
  const canvas = document.createElement('canvas');
  const context: any = canvas.getContext('2d');
  context.font = '14px';
  return context?.measureText(text)?.width || 0;
};

class IntervalBarLabel extends GeometryLabel {
  getLabelOffsetPoint(labelCfg: LabelCfg, index: number, total: number) {
    const labelPoint = super.getLabelOffsetPoint(labelCfg, index, total);
    const { x, y } = labelPoint;

    const style = labelCfg?.style || {};

    style.fontSize = FONT_SIZE_12;
    style.fontFamily = DEFAULT_FONT_FAMILY;
    style.fill = DEFAULT_FONT_COLOR;

    const blankWidth = get(labelCfg, 'coordinate.width') - get(labelCfg, 'mappingData.x');
    if (blankWidth < 200) {
      const labelWidth = getTextWidth(get(labelCfg, 'content[0]') || 0);
      if (blankWidth < labelWidth) {
        style.fill = '#ffffff';
        return { x: -labelWidth - 24, y };
      }
    }
    return { x, y };
  }
}

export default IntervalBarLabel;
