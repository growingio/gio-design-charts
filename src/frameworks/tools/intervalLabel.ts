import { LabelCfg } from '@antv/g2/lib/geometry/label/interface';
import { default as G2IntervalLabel } from '@antv/g2/lib/geometry/label/interval';

class IntervalLabel extends G2IntervalLabel {
  protected getLabelOffsetPoint(labelCfg: LabelCfg, index: number, total: number) {
    const point = super.getLabelOffsetPoint(labelCfg, index, total);
    const showInTop = (labelCfg?.mappingData?.points?.[1] as any)?.y < 0.01;
    const { x, y } = point;

    // 如果字体在矩形里面，则使用白色字体
    const style = labelCfg?.style || {};
    style.fill = showInTop ? style.fill : '#ffffff';

    return { x, y: showInTop ? y : -y };
  }
}

export default IntervalLabel;
