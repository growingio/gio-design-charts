const analysisRow = (chartType: string, data: any, column: any) => {
  return chartType === 'column' && column.id === 'tm' ? String(data) : data;
};

export interface analysisOptions {
  // chart的类型
  chart: string;
  // 在生成的data中，需要补充的结构，比如color
  fetch: any;
  // 格式化的方法，使用者根据formatter重新定义数据
  formatter: any;
}

export const analysisSourceData = (chartData: any, options?: analysisOptions) => {
  const chartType = options?.chart || 'line';
  const fetch = options?.fetch || {};
  const formatter = options?.formatter;
  const source = chartData?.data || [];
  const columns = chartData?.meta?.columns;
  const convert = source?.map((item: any) => {
    const row = {} as any;
    columns.map((column: any, index: number) => {
      let value = item?.[index];
      if (formatter) {
        value = formatter?.(value, column);
      } else {
        value = analysisRow(chartType, item?.[index], column);
      }
      row[column.id] = value;
    });
    return Object.assign(row, fetch);
  });
  return convert;
};
