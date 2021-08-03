import React, { CSSProperties } from "react";
import Frame from "../../components/frame";
import {
  BarDefaultExample,
  BarWithGroupExample,
  PercentBarExample,
  StackingDiagramBarExample,
} from "../bar/Bar.stories";
import {
  ColumnWithGroupExample,
  ColumnWithMultiExample,
  ColumnWithOneExample,
  PercentColumnExample,
  StackingDiagramColumnExample,
} from "../column/Column.stories";
import { FunnelWithLinkExample } from "../funnel/Funnel.stories";

import {
  LineWithOneLineExample,
  LineWithDashExample,
  LineWithMenuExample,
} from "../line/Line.stories";

const titleStyle: CSSProperties = {
  fontSize: "24px",
  fontWeight: 400,
  padding: "8px 20px",
};

const Dashboard = () => {
  return (
    <>
      <div style={{ display: "flow-root" }}>
        <div style={titleStyle}>折线图</div>
        <div>
          <Frame type="left">
            <LineWithOneLineExample />
          </Frame>
          <Frame type="right">
            <LineWithDashExample />
          </Frame>
        </div>
        <div>
          <Frame type="left">
            <LineWithMenuExample />
          </Frame>
          <Frame type="right" />
        </div>
      </div>

      <div style={{ display: "flow-root" }}>
        <div style={titleStyle}>柱状图</div>
        <div>
          <Frame type="left">
            <ColumnWithOneExample />
          </Frame>
          <Frame type="right">
            <ColumnWithMultiExample />
          </Frame>
        </div>
        <div>
          <Frame type="left">
            <ColumnWithGroupExample />
          </Frame>
          <Frame type="right">
            <StackingDiagramColumnExample />
          </Frame>
        </div>
        <div>
          <Frame type="left">
            <PercentColumnExample />
          </Frame>
          <Frame type="right" />
        </div>
      </div>

      <div style={{ display: "flow-root" }}>
        <div style={titleStyle}>条形图</div>
        <div>
          <Frame type="left">
            <BarDefaultExample />
          </Frame>
          <Frame type="right">
            <BarWithGroupExample />
          </Frame>
        </div>
        <div>
          <Frame type="left">
            <StackingDiagramBarExample />
          </Frame>
          <Frame type="right">
            <PercentBarExample />
          </Frame>
        </div>
        <FunnelWithLinkExample />
      </div>
    </>
  );
};

export default Dashboard;
