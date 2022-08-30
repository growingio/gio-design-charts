import { GeometryLabel } from '@antv/g2';
import { LabelCfg } from '@antv/g2/lib/geometry/label/interface';
import { get } from 'lodash';
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_FAMILY, FONT_SIZE_12 } from '../../theme';

const getTextWidth = (text: string) => {
  const canvas = document.createElement('canvas');
  const context: any = canvas.getContext('2d');
  context.font = '14px';
  const dimension = context?.measureText(text);
  return dimension?.width;
};

class IntervalBarLabel extends GeometryLabel {
  protected getLabelOffsetPoint(labelCfg: LabelCfg, index: number, total: number) {
    const labelPoint = super.getLabelOffsetPoint(labelCfg, index, total);
    const { x, y } = labelPoint;

    // const element = this.geometry.elementsMap[labelCfg.elementId];
    // const model = element?.getModel();
    // const color = getColorByModel(model);
    const style = labelCfg?.style || {};

    style.fontSize = FONT_SIZE_12;
    style.fontFamily = DEFAULT_FONT_FAMILY;
    // style.fill = '#ffffff';
    style.fill = DEFAULT_FONT_COLOR;
    // style.shadowColor = color;
    // style.shadowBlur = 3;

    const blankWidth = get(labelCfg, 'coordinate.width') - get(labelCfg, 'mappingData.x');
    console.log('====>>>', blankWidth, labelPoint, labelCfg, getTextWidth(get(labelCfg, 'content[0]') || 0));
    const labelWidth = getTextWidth(get(labelCfg, 'content[0]') || 0);
    if (blankWidth < labelWidth) {
      style.fill = '#ffffff';
      return { x: -labelWidth - 24, y };
    }
    return { x, y };
  }
}

export default IntervalBarLabel;
