import React from 'react';

const Item = (props: any) => {
  const { data, forwardKey, valueKey, formatter } = props;
  const item = data?.data;
  const value = item?.[valueKey] || item.value;
  const formatedValue = formatter ? formatter(value) : value;
  return (
    <div className="gio-d-chart-infocard_item">
      <span className="gio-d-chart-infocard_label">
        <div
          className={`gio-d-chart-infocard_block gio-d-chart-infocard_${data?.type as 'bar' | 'line'}`}
          style={data.styles || {}}
        />
        {item?.[forwardKey]}
      </span>
      <span className="gio-d-chart-infocard_value">{formatedValue}</span>
    </div>
  );
};

export default Item;
