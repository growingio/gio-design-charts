import React, { CSSProperties } from 'react';
import { ChartProps } from '../../../src';
import Frame from '../../components/frame';
import { AreaStack, AreaWithSample, PercentArea } from '../area/Area.stories';
import { BarDefault, BarWithGroup, PercentBar, StackingDiagramBar } from '../bar/Bar.stories';
import {
  ColumnWithGroup,
  ColumnWithMulti,
  ColumnWithOne,
  PercentColumn,
  StackingDiagramColumn,
} from '../column/Column.stories';
import {
  FunnelWith3Columns,
  FunnelWith6Columns,
  FunnelWith7Columns,
  FunnelWithBasic,
  FunnelWithGroup,
} from '../funnel/Funnel.stories';
// import { FunnelWithLinkExample } from '../funnel/Funnel.stories';

import { LineWithOneLine, LineWithDash, LineWithMenu } from '../line/Line.stories';

const titleStyle: CSSProperties = {
  fontSize: '24px',
  fontWeight: 400,
  padding: '0 20px',
  margin: '8px',
  borderLeft: '5px solid rgb(29 153 230)',
};

const Dashboard = () => {
  return (
    <>
      <div style={{ display: 'flow-root' }}>
        <div style={titleStyle}>折线图</div>
        <div>
          <Frame
            type="left"
            title={LineWithOneLine.storyName}
            path="/?path=/story/charts-折线图-面积图--line-with-one-line"
          >
            <LineWithOneLine {...(LineWithOneLine.args as ChartProps)} />
          </Frame>
          <Frame type="right" title={LineWithDash.storyName} path="/?path=/story/charts-折线图-面积图--line-with-dash">
            <LineWithDash {...(LineWithDash.args as ChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame type="left" title={LineWithMenu.storyName} path="/?path=/story/charts-折线图-面积图--line-with-menu">
            <LineWithMenu {...(LineWithMenu.args as ChartProps)} />
          </Frame>
          <Frame type="right" />
        </div>
      </div>

      <div style={{ display: 'flow-root' }}>
        <div style={titleStyle}>面积图</div>
        <div>
          <Frame
            type="left"
            title={AreaWithSample.storyName}
            path="/?path=/story/charts-面积图-area-chart--area-with-sample"
          >
            <AreaWithSample {...(AreaWithSample.args as ChartProps)} />
          </Frame>
          <Frame type="right" title={AreaStack.storyName} path="/?path=/story/charts-面积图-area-chart--area-stack">
            <AreaStack {...(AreaStack.args as ChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame type="left" title={PercentArea.storyName} path="/?path=/story/charts-面积图-area-chart--percent-area">
            <PercentArea {...(PercentArea.args as ChartProps)} />
          </Frame>
          <Frame type="right" />
        </div>
      </div>

      <div style={{ display: 'flow-root' }}>
        <div style={titleStyle}>柱状图</div>
        <div>
          <Frame
            type="left"
            title={ColumnWithOne.storyName}
            path="/?path=/story/charts-柱状图-column-chart--column-with-one"
          >
            <ColumnWithOne {...(ColumnWithOne.args as ChartProps)} />
          </Frame>
          <Frame
            type="right"
            title={ColumnWithMulti.storyName}
            path="/?path=/story/charts-柱状图-column-chart--column-with-multi"
          >
            <ColumnWithMulti {...(ColumnWithMulti.args as ChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={ColumnWithGroup.storyName}
            path="/?path=/story/charts-柱状图-column-chart--column-with-group"
          >
            <ColumnWithGroup {...(ColumnWithGroup.args as ChartProps)} />
          </Frame>
          <Frame
            type="right"
            title={StackingDiagramColumn.storyName}
            path="/?path=/story/charts-柱状图-column-chart--stacking-diagram-column"
          >
            <StackingDiagramColumn {...(StackingDiagramColumn.args as ChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={PercentColumn.storyName}
            path="/?path=/story/charts-柱状图-column-chart--percent-column"
          >
            <PercentColumn {...(PercentColumn.args as ChartProps)} />
          </Frame>
          <Frame type="right" />
        </div>
      </div>

      <div style={{ display: 'flow-root' }}>
        <div style={titleStyle}>条形图</div>
        <div>
          <Frame type="left" title={BarDefault.storyName} path="/?path=/story/charts-条形图-bar-chart--bar-default">
            <BarDefault {...(BarDefault.args as ChartProps)} />
          </Frame>
          <Frame
            type="right"
            title={BarWithGroup.storyName}
            path="/?path=/story/charts-条形图-bar-chart--bar-with-group"
          >
            <BarWithGroup {...(BarWithGroup.args as ChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={StackingDiagramBar.storyName}
            path="/?path=/story/charts-条形图-bar-chart--stacking-diagram-bar"
          >
            <StackingDiagramBar {...(StackingDiagramBar.args as ChartProps)} />
          </Frame>
          <Frame type="right" title={PercentBar.storyName} path="/?path=/story/charts-条形图-bar-chart--percent-bar">
            <PercentBar {...(PercentBar.args as ChartProps)} />
          </Frame>
        </div>
        {/* <FunnelWithLinkExample /> */}
      </div>

      <div style={{ display: 'flow-root' }}>
        <div style={titleStyle}>漏斗图</div>
        <div>
          <Frame
            type="left"
            title={FunnelWithBasic.storyName}
            path="/?path=/story/charts-漏斗图-funnel-chart--funnel-with-basic"
          >
            <FunnelWithBasic {...(FunnelWithBasic.args as ChartProps)} />
          </Frame>
          <Frame
            type="right"
            title={FunnelWith3Columns.storyName}
            path="/?path=/story/charts-漏斗图-funnel-chart--funnel-with-3-columns"
          >
            <FunnelWith3Columns {...(FunnelWith3Columns.args as ChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={FunnelWith6Columns.storyName}
            path="/?path=/story/charts-漏斗图-funnel-chart--funnel-with-6-columns"
          >
            <FunnelWith6Columns {...(FunnelWith6Columns.args as ChartProps)} />
          </Frame>
          <Frame
            type="right"
            title={FunnelWith7Columns.storyName}
            path="/?path=/story/charts-漏斗图-funnel-chart--funnel-with-7-columns"
          >
            <FunnelWith7Columns {...(FunnelWith7Columns.args as ChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={FunnelWithGroup.storyName}
            path="/?path=/story/charts-漏斗图-funnel-chart--funnel-with-group"
          >
            <FunnelWithGroup {...(FunnelWithGroup.args as ChartProps)} />
          </Frame>
          <Frame type="right" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
