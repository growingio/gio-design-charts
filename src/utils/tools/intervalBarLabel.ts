import { GeometryLabel } from '@antv/g2';
import { LabelCfg } from '@antv/g2/lib/geometry/label/interface';
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_FAMILY, FONT_SIZE_12 } from '../../theme';

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

    return { x, y };
  }
}

export default IntervalBarLabel;
