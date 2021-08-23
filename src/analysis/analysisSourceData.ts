const analysisRow = (data: any, column: any) => {
  return column.id === 'tm' ? String(data) : data;
};

export const analysisSourceData = (chartData: any, options?: any) => {
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
        value = analysisRow(item?.[index], column);
      }
      row[column.id] = value;
    });
    return Object.assign(row, fetch);
  });
  return convert;
};
