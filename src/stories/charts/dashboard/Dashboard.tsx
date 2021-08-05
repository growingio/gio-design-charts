import React, { CSSProperties } from 'react';
import { IChartConfig, IChartProps } from '../../../interface';
import Frame from '../../components/frame';
import { BarDefault, BarWithGroup, PercentBar, StackingDiagramBar } from '../bar/Bar.stories';
import {
  ColumnWithGroup,
  ColumnWithMulti,
  ColumnWithOne,
  PercentColumn,
  StackingDiagramColumn,
} from '../column/Column.stories';
import { FunnelWithLinkExample } from '../funnel/Funnel.stories';

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
            <LineWithOneLine {...(LineWithOneLine.args as IChartProps)} />
          </Frame>
          <Frame type="right" title={LineWithDash.storyName} path="/?path=/story/charts-折线图-面积图--line-with-dash">
            <LineWithDash {...(LineWithDash.args as IChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame type="left" title={LineWithMenu.storyName} path="/?path=/story/charts-折线图-面积图--line-with-menu">
            <LineWithMenu {...(LineWithMenu.args as IChartProps)} />
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
            <ColumnWithOne {...(ColumnWithOne.args as IChartProps)} />
          </Frame>
          <Frame
            type="right"
            title={ColumnWithMulti.storyName}
            path="/?path=/story/charts-柱状图-column-chart--column-with-multi"
          >
            <ColumnWithMulti {...(ColumnWithMulti.args as IChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={ColumnWithGroup.storyName}
            path="/?path=/story/charts-柱状图-column-chart--column-with-group"
          >
            <ColumnWithGroup {...(ColumnWithGroup.args as IChartProps)} />
          </Frame>
          <Frame
            type="right"
            title={StackingDiagramColumn.storyName}
            path="/?path=/story/charts-柱状图-column-chart--stacking-diagram-column"
          >
            <StackingDiagramColumn {...(StackingDiagramColumn.args as IChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={PercentColumn.storyName}
            path="/?path=/story/charts-柱状图-column-chart--percent-column"
          >
            <PercentColumn {...(PercentColumn.args as IChartProps)} />
          </Frame>
          <Frame type="right" />
        </div>
      </div>

      <div style={{ display: 'flow-root' }}>
        <div style={titleStyle}>条形图</div>
        <div>
          <Frame type="left" title={BarDefault.storyName} path="/?path=/story/charts-条形图-bar-chart--bar-default">
            <BarDefault {...(BarDefault.args as IChartProps)} />
          </Frame>
          <Frame
            type="right"
            title={BarWithGroup.storyName}
            path="/?path=/story/charts-条形图-bar-chart--bar-with-group"
          >
            <BarWithGroup {...(BarWithGroup.args as IChartProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={StackingDiagramBar.storyName}
            path="/?path=/story/charts-条形图-bar-chart--stacking-diagram-bar"
          >
            <StackingDiagramBar {...(StackingDiagramBar.args as IChartProps)} />
          </Frame>
          <Frame type="right" title={PercentBar.storyName} path="/?path=/story/charts-条形图-bar-chart--percent-bar">
            <PercentBar {...(PercentBar.args as IChartProps)} />
          </Frame>
        </div>
        {/* <FunnelWithLinkExample /> */}
      </div>
    </>
  );
};

export default Dashboard;
