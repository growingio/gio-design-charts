import React, { CSSProperties } from "react";
import Card from "../card";

const leftStyles: CSSProperties = {
  width: "50%",
  float: "left",
};

const rightStyles: CSSProperties = {
  width: "50%",
  float: "right",
};

const Frame = (props: any) => {
  const { children, type } = props;
  return (
    <div style={type === "right" ? rightStyles : leftStyles}>
      <Card>{children}</Card>
    </div>
  );
};

export default Frame;
