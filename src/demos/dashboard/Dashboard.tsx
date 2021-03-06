import React, { CSSProperties } from 'react';
import Frame from '../frame';
import { AreaStack, PercentArea } from '../../area/demos/Area.stories';
import { BarDefault, BarWithGroup, PercentBar, StackingDiagramBar } from '../../bar/demos/Bar.stories';
import {
  ColumnWithGroup,
  ColumnWithMulti,
  PercentColumn,
  StackingDiagramColumn,
} from '../../column/demos/Column.stories';
import {
  FunnelWith3Columns,
  FunnelWith6Columns,
  FunnelWith7Columns,
  FunnelWithBasic,
  FunnelWithGroup,
} from '../../funnel/demos/Funnel.stories';

import { MultiLine, BaiscLine, ContrastLineExample } from '../../line/demos/Line.stories';
import { ColumnProps } from '../../column/Column';
import { BarProps } from '../../bar/Bar';
import { FunnelProps } from '../../funnel/Funnel';
import { LineProps } from '../../line/Line';
import { AreaProps } from '../../area/Area';

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
          <Frame type="left" title={BaiscLine.storyName} path="/?path=/story/charts-折线图-line--baisc-line">
            <BaiscLine {...(BaiscLine.args as LineProps)} />
          </Frame>
          <Frame
            type="right"
            title={ContrastLineExample.storyName}
            path="/?path=/story/charts-折线图-line--contrast-line"
          >
            <ContrastLineExample {...(ContrastLineExample.args as LineProps)} />
          </Frame>
        </div>
        <div>
          <Frame type="left" title={MultiLine.storyName} path="/?path=/story/charts-折线图-line--multi-line">
            <MultiLine {...(MultiLine.args as LineProps)} />
          </Frame>
          <Frame type="right" />
        </div>
      </div>

      <div style={{ display: 'flow-root' }}>
        <div style={titleStyle}>面积图</div>
        <div>
          <Frame type="left" title={AreaStack.storyName} path="/?path=/story/charts-面积图-area--area-stack">
            <AreaStack {...(AreaStack.args as AreaProps)} />
          </Frame>
          <Frame type="right" title={PercentArea.storyName} path="/?path=/story/charts-面积图-area--percent-area">
            <PercentArea {...(PercentArea.args as AreaProps)} />
          </Frame>
        </div>
      </div>

      <div style={{ display: 'flow-root' }}>
        <div style={titleStyle}>柱状图</div>
        <div>
          <Frame
            type="right"
            title={ColumnWithMulti.storyName}
            path="/?path=/story/charts-柱状图-column-chart--column-with-multi"
          >
            <ColumnWithMulti {...(ColumnWithMulti.args as ColumnProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={ColumnWithGroup.storyName}
            path="/?path=/story/charts-柱状图-column-chart--column-with-group"
          >
            <ColumnWithGroup {...(ColumnWithGroup.args as ColumnProps)} />
          </Frame>
          <Frame
            type="right"
            title={StackingDiagramColumn.storyName}
            path="/?path=/story/charts-柱状图-column-chart--stacking-diagram-column"
          >
            <StackingDiagramColumn {...(StackingDiagramColumn.args as ColumnProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={PercentColumn.storyName}
            path="/?path=/story/charts-柱状图-column-chart--percent-column"
          >
            <PercentColumn {...(PercentColumn.args as ColumnProps)} />
          </Frame>
          <Frame type="right" />
        </div>
      </div>

      <div style={{ display: 'flow-root' }}>
        <div style={titleStyle}>条形图</div>
        <div>
          <Frame type="left" title={BarDefault.storyName} path="/?path=/story/charts-条形图-bar-chart--bar-default">
            <BarDefault {...(BarDefault.args as BarProps)} />
          </Frame>
          <Frame
            type="right"
            title={BarWithGroup.storyName}
            path="/?path=/story/charts-条形图-bar-chart--bar-with-group"
          >
            <BarWithGroup {...(BarWithGroup.args as BarProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={StackingDiagramBar.storyName}
            path="/?path=/story/charts-条形图-bar-chart--stacking-diagram-bar"
          >
            <StackingDiagramBar {...(StackingDiagramBar.args as BarProps)} />
          </Frame>
          <Frame type="right" title={PercentBar.storyName} path="/?path=/story/charts-条形图-bar-chart--percent-bar">
            <PercentBar {...(PercentBar.args as BarProps)} />
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
            <FunnelWithBasic {...(FunnelWithBasic.args as FunnelProps)} />
          </Frame>
          <Frame
            type="right"
            title={FunnelWith3Columns.storyName}
            path="/?path=/story/charts-漏斗图-funnel-chart--funnel-with-3-columns"
          >
            <FunnelWith3Columns {...(FunnelWith3Columns.args as FunnelProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={FunnelWith6Columns.storyName}
            path="/?path=/story/charts-漏斗图-funnel-chart--funnel-with-6-columns"
          >
            <FunnelWith6Columns {...(FunnelWith6Columns.args as FunnelProps)} />
          </Frame>
          <Frame
            type="right"
            title={FunnelWith7Columns.storyName}
            path="/?path=/story/charts-漏斗图-funnel-chart--funnel-with-7-columns"
          >
            <FunnelWith7Columns {...(FunnelWith7Columns.args as FunnelProps)} />
          </Frame>
        </div>
        <div>
          <Frame
            type="left"
            title={FunnelWithGroup.storyName}
            path="/?path=/story/charts-漏斗图-funnel-chart--funnel-with-group"
          >
            <FunnelWithGroup {...(FunnelWithGroup.args as FunnelProps)} />
          </Frame>
          <Frame type="right" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
