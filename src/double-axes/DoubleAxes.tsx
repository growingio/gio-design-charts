import React, { useMemo } from 'react';
import { ChartConfig, ChartProps, DoubleAxesConfig, ChartType, ChartRef, Shape } from '../interfaces';
import { DoubleAxes as DoubleAxesCls } from './framework';
import { LegendLayout, ScrollXLayout } from '../layouts';
import { fetchChart } from '../boundary';
import { getShapeConfig } from '../utils/tools/shapeConfig';

export interface DoubleAxesProps extends ChartProps {
  config: DoubleAxesConfig;
  useScroll?: boolean;
}

const DoubleAxes: React.ForwardRefRenderFunction<ChartRef, DoubleAxesProps> = (props, forwardRef) => {
  const { data, legends: legendProps = [], config, useScroll, title } = props;
  const doubleAxes = useMemo(() => new DoubleAxesCls(), []);
  // ChartType.DoubleAxes === 'column' 这是保证，双轴图至少需要绘制一个柱状图
  config.type = ChartType.DoubleAxes;

  // 横向滚动布局的宽度计算只统计柱数据：折线记录的 color label 会混入 dodge 分组导致宽度虚高
  const columnData = useMemo(() => {
    const columnCfg = getShapeConfig(config, ChartType.COLUMN);
    return doubleAxes.filterDataByPosition((data || []) as any, (columnCfg as Shape).position);
  }, [data, config, doubleAxes]);

  // 供 calculateColumnWidth 计算滚动宽度使用：type 需为 'column' 才能读到 config.column 的
  // position/color/dodge 配置。渲染路径对 type 不敏感（getShapeConfig 对 'column' 与
  // 'double-axes' 都解析到 config.column），不影响双轴图本身的渲染
  const scrollConfig = useMemo(() => ({ ...(config as ChartConfig), type: ChartType.COLUMN }), [config]);

  return useScroll ? (
    <ScrollXLayout
      ref={forwardRef}
      title={title}
      data={data}
      sourceData={columnData}
      legendList={legendProps}
      config={scrollConfig}
      chart={doubleAxes}
    />
  ) : (
    <LegendLayout
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      chart={doubleAxes}
      ref={forwardRef}
    />
  );
};

export default fetchChart<DoubleAxesProps>(DoubleAxes);
