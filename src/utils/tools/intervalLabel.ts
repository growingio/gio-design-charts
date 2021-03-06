import { GeometryLabel } from '@antv/g2';
import { LabelCfg } from '@antv/g2/lib/geometry/label/interface';
import { DEFAULT_FONT_FAMILY, FONT_SIZE_12 } from '../../theme';
import { getColorByModel } from './utils';

class IntervalLabel extends GeometryLabel {
  protected getLabelOffsetPoint(labelCfg: LabelCfg, index: number, total: number) {
    const labelPoint = super.getLabelOffsetPoint(labelCfg, index, total);
    const { x, y } = labelPoint;

    const element = this.geometry.elementsMap[labelCfg.elementId];
    const model = element?.getModel();
    const color = getColorByModel(model);
    const style = labelCfg?.style || {};

    const coordinate = element?.shapeFactory?.coordinate;
    const columnHeight = (coordinate?.start?.y || 0) - Number(model.y);
    const showInTop = columnHeight <= 18;

    style.fontSize = FONT_SIZE_12;
    style.fontFamily = DEFAULT_FONT_FAMILY;
    style.fill = '#ffffff';
    style.shadowColor = color;
    style.shadowBlur = 3;

    if (showInTop) {
      style.fill = color;
      style.shadowColor = '#fff';
      style.shadowBlur = 0;
    }
    return { x, y: showInTop ? y : -y };
  }
}

export default IntervalLabel;
