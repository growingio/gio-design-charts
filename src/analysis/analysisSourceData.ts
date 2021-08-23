const analysisRow = (chartType: string, data: any, column: any) => {
  return chartType === 'column' && column.id === 'tm' ? String(data) : data;
};

export const analysisSourceData = (chartData: any, options?: any) => {
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
