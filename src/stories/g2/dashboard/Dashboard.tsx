import React, { CSSProperties } from "react";
import Card from "../../components/Card";
import {
  BarWithGroupExample,
  BarWithMultiExample,
  BarWithOneExample,
  PercentBarExample,
  StackingDiagramBarExample,
} from "../bar/Story";

import {
  LineWithOneLineExample,
  LineWithDashExample,
  LineWithMenuExample,
} from "../line/Story";

const titleStyle: CSSProperties = {
  fontSize: "24px",
  fontWeight: 400,
  padding: "8px 20px",
};

const leftStyles: CSSProperties = {
  width: "50%",
  float: "left",
};

const rightStyles: CSSProperties = {
  width: "50%",
  float: "right",
};

const Dashboard = () => {
  return (
    <>
      <div style={{ display: "flow-root" }}>
        <div style={titleStyle}>条形图</div>
        <div>
          <div style={leftStyles}>
            <Card>
              <LineWithOneLineExample />
            </Card>
          </div>
          <div style={rightStyles}>
            <Card>
              <LineWithDashExample />
            </Card>
          </div>
        </div>
        <div>
          <div style={leftStyles}>
            <Card>
              <LineWithMenuExample />
            </Card>
          </div>
          <div style={rightStyles}> </div>
        </div>
      </div>
      <div style={{ display: "flow-root" }}>
        <div style={titleStyle}>柱状图</div>
        <div>
          <div style={leftStyles}>
            <Card>
              <BarWithOneExample />
            </Card>
          </div>
          <div style={rightStyles}>
            <Card>
              <BarWithMultiExample />
            </Card>
          </div>
        </div>
        <div>
          <div style={leftStyles}>
            <Card>
              <BarWithGroupExample />
            </Card>
          </div>
          <div style={rightStyles}>
            <Card>
              <StackingDiagramBarExample />
            </Card>
          </div>
        </div>
        <div>
          <div style={leftStyles}>
            <Card>
              <PercentBarExample />
            </Card>
          </div>
          <div style={rightStyles} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
