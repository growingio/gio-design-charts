import { LooseObject } from '@antv/component';

const analysisRow = (chartType: string, data: LooseObject, column: LooseObject) =>
  chartType === 'column' && column.id === 'tm' ? String(data) : data;

export interface AnalysisOptions {
  // chart的类型
  chart?: string;
  // 在生成的data中，需要补充的结构，比如color
  fetch?: LooseObject;
  // 格式化的方法，使用者根据formatter重新定义数据
  formatter?: <T extends string | number>(value: T, column?: LooseObject) => T;
}

export const analysisSourceData = (chartData: LooseObject, options?: AnalysisOptions) => {
  const chartType = options?.chart || 'line';
  const fetch = options?.fetch || {};
  const formatter = options?.formatter;
  const source = chartData?.data || [];
  const columns = chartData?.meta?.columns;

  return source.map((item: LooseObject) => {
    const row = {} as LooseObject;
    columns?.forEach((column: LooseObject, index: number) => {
      let value = item?.[index];
      if (formatter) {
        value = formatter(value, column);
      } else {
        value = analysisRow(chartType, item?.[index], column);
      }
      row[column.id] = value;
    });
    return Object.assign(row, fetch);
  });
};
