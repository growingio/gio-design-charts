import React from 'react';

const Item = (props: any) => {
  const { data, forwardKey } = props;
  const item = data?.data;
  return (
    <div className="gio-d-chart-infocard_item">
      <span className="gio-d-chart-infocard_label">
        <div
          className={`gio-d-chart-infocard_block gio-d-chart-infocard_${data?.type as 'bar' | 'line'}`}
          style={data.styles || {}}
        />
        {item?.[forwardKey]}
      </span>
      <span className="gio-d-chart-infocard_value">{item.value}</span>
    </div>
  );
};

export default Item;
