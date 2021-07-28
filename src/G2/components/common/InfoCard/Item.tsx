import React from "react";

const Item = (props: any) => {
  const { data, legend = {} } = props;
  const { color, lineDash, type } = legend;

  const styles = lineDash
    ? { border: `1px dashed ${color}`, height: 0, width: "12px" }
    : { backgroundColor: color };

  return (
    <div className="item">
      <span className="label">
        <div className={`block ${type}`} style={styles} />
        {data.name}
      </span>
      <span className="value">{data.value}</span>
    </div>
  );
};

export default Item;
