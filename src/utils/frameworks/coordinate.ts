import { Chart } from '@antv/g2';

/**
 * 在生成仪表图的极值坐标轴
 * startAngle: (-1 / 2) * Math.PI; // 最上端为起点
 * endAngle: 1.4999999 * Math.PI; // 设置最上端为结点，当使用1.5的时候，会形成一个闭环，默认为起点；
 * @param chart {Chart}
 * @returns
 */
export const bindGuageCoordination = (chart: Chart) => {
  chart.coordinate('polar', {
    startAngle: (-1 / 2) * Math.PI,
    endAngle: 1.4999999 * Math.PI,
    radius: 0.75,
  });
  return chart;
};
