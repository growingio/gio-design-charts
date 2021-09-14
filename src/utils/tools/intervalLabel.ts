import { Point } from '@antv/component';
import { GeometryLabel } from '@antv/g2';
import { LabelCfg } from '@antv/g2/lib/geometry/label/interface';

class IntervalLabel extends GeometryLabel {
  protected getLabelOffsetPoint(labelCfg: LabelCfg, index: number, total: number) {
    const point = super.getLabelOffsetPoint(labelCfg, index, total);
    const showInTop = (labelCfg?.mappingData?.points?.[1] as Point)?.y < 0.01;
    const { x, y } = point;

    // 如果字体在矩形里面，则使用白色字体
    const style = labelCfg?.style || {};
    style.fill = showInTop ? style.fill : '#ffffff';
    return { x, y: showInTop ? y : -y };
  }
}

export default IntervalLabel;
