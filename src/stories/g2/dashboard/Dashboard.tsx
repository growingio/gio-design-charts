import React, { CSSProperties } from "react";
import Card from "../../components/Card";
import {
  BarDefaultExample,
  BarWithGroupExample,
  PercentBarExample,
  StackingDiagramBarExample,
} from "../bar/Story";
import {
  ColumnWithGroupExample,
  ColumnWithMultiExample,
  ColumnWithOneExample,
  PercentColumnExample,
  StackingDiagramColumnExample,
} from "../column/Story";

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
        <div style={titleStyle}>折线图</div>
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
              <ColumnWithOneExample />
            </Card>
          </div>
          <div style={rightStyles}>
            <Card>
              <ColumnWithMultiExample />
            </Card>
          </div>
        </div>
        <div>
          <div style={leftStyles}>
            <Card>
              <ColumnWithGroupExample />
            </Card>
          </div>
          <div style={rightStyles}>
            <Card>
              <StackingDiagramColumnExample />
            </Card>
          </div>
        </div>
        <div>
          <div style={leftStyles}>
            <Card>
              <PercentColumnExample />
            </Card>
          </div>
          <div style={rightStyles} />
        </div>
      </div>

      <div style={{ display: "flow-root" }}>
        <div style={titleStyle}>条形图</div>
        <div>
          <div style={leftStyles}>
            <Card>
              <BarDefaultExample />
            </Card>
          </div>
          <div style={rightStyles}>
            <Card>
              <BarWithGroupExample />
            </Card>
          </div>
        </div>
        <div>
          <div style={leftStyles}>
            <Card>
              <StackingDiagramBarExample />
            </Card>
          </div>
          <div style={rightStyles}>
            <Card>
              <PercentBarExample />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
