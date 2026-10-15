import React from 'react';
import { render, screen } from '@testing-library/react';

import { DoubleAxes as DoubleAxesCls } from '../framework';
import { ChartType } from '../../interfaces';
import { chartComponentTestid, ChartCom } from '../../core/__test__/framework.test';

const config = {
  type: ChartType.DoubleAxes,
  scale: {
    lineValue: { nice: true, min: 0 },
    col: { nice: true, min: 0 },
  },
  axises: [['lineValue', { grid: null }]],
  column: {
    position: 'time*col',
    color: 'label',
    adjust: 'dodge',
  },
  line: {
    position: 'time*lineValue',
    color: 'label',
  },
};

const makeData = (colBase: number, lineBase: number) =>
  ['2023-03-25', '2023-03-26', '2023-03-27', '2023-03-28', '2023-03-29', '2023-03-30'].flatMap((time) => [
    { time, label: '参与人数', col: colBase },
    { time, label: '触发人数', col: colBase * 2 },
    { time, label: '参与率(%)', lineValue: lineBase },
    { time, label: '出发率(%)', lineValue: lineBase * 2 },
  ]);

describe('DoubleAxes framework', () => {
  const getViewPaddings = (chart: DoubleAxesCls) =>
    ((chart.instance as any)?.views || []).map((view: any) => view.autoPadding?.getPadding());

  test('views keep the same autoPadding after data update', () => {
    const chart = new DoubleAxesCls();
    render(<ChartCom />);
    const element = screen.getByTestId(chartComponentTestid);
    // 刻意让左右轴标签宽度差异明显（col 刻度 6 位、lineValue 刻度 1-2 位）
    chart.render({ id: element, data: makeData(100000, 5) }, config as any);

    // 首次渲染：syncViewPadding 生效，两个 view padding 一致
    const [columnPad, linePad] = getViewPaddings(chart);
    // 左 padding 来自 col 轴宽标签，非 0 说明测量有效、断言非空转
    expect(columnPad[3]).toBeGreaterThan(0);
    expect(columnPad).toEqual(linePad);

    // 更新数据后 padding 仍应一致
    chart.update(makeData(200000, 8));
    const [columnPad2, linePad2] = getViewPaddings(chart);
    expect(columnPad2).toEqual(linePad2);

    // 对照组：关闭 syncViewPadding 后，两个 view 的 padding 应当出现差异，
    // 证明 jsdom 的文本测量足以区分宽窄标签、上面的“一致”断言有效
    (chart.instance as any).syncViewPadding = false;
    chart.update(makeData(300000, 3));
    const [columnPad3, linePad3] = getViewPaddings(chart);
    expect(columnPad3).not.toEqual(linePad3);
  });
});
