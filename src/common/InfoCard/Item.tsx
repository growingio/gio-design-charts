import React from 'react';

const Item = (props: any) => {
  const { data, forwardKey, formatter } = props;
  const item = data?.data;
  const value = formatter ? formatter(item.value) : item.value;
  return (
    <div className="gio-d-chart-infocard_item">
      <span className="gio-d-chart-infocard_label">
        <div
          className={`gio-d-chart-infocard_block gio-d-chart-infocard_${data?.type as 'bar' | 'line'}`}
          style={data.styles || {}}
        />
        {item?.[forwardKey]}
      </span>
      <span className="gio-d-chart-infocard_value">{value}</span>
    </div>
  );
};

export default Item;
