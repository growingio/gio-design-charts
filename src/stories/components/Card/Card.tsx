import React from "react";

const Card = (props: any) => {
  const { children } = props;
  return (
    <div
      style={{
        border: "1px solid #EBEDF5",
        borderRadius: "4px",
        padding: 20,
        margin: 8,
        height: 350,
        display: "block",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
