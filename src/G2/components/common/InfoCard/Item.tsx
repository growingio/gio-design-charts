import React from "react";

const Item = (props: any) => {
  const { data, legend = {} } = props;
  return (
    <div className="item">
      <span
        className="label"
        // onClick={onClickLabel}
        // style={{ opacity: data.active ? 1 : 0.5 }}
      >
        <div className="block" style={{ backgroundColor: legend.color }} />
        {data.name}
      </span>
      <span className="value">{data.value}</span>
    </div>
  );
};

export default Item;
