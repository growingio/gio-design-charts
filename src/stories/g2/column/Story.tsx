import { ComponentStory } from "@storybook/react";
import ColumnChart from "../../../charts/ColumnsChart";
import Card from "../../components/Card";
import {
  dataWithGroup,
  dataWithGroupStack,
  dataWithMultiBar,
  dataWithOneBar,
  percentData,
} from "./data";

const Template: ComponentStory<typeof ColumnChart> = (args) => (
  <Card>
    <ColumnChart {...args} />
  </Card>
);

const config = {
  chart: {
    autoFit: true,
    height: 300,
  },
  scale: ["value", { nice: true }],
  tooltip: {
    enterable: true,
    showContent: true,
    // shared: true,
  },
};

export const ColumnWithOne = Template.bind({});
const ColumnWithOneArgs = {
  legends: ["Apple"],
  data: dataWithOneBar,
  config: {
    ...config,
    column: {
      position: "type*value",
      color: "company",
    },
  },
};
ColumnWithOne.storyName = "柱状图 Column Chart";
ColumnWithOne.args = { ...ColumnWithOneArgs };
export const ColumnWithOneExample = () => (
  <ColumnChart {...ColumnWithOneArgs} />
);

export const ColumnWithMulti = Template.bind({});
const ColumnWithMultiArgs = {
  legends: [
    "Apple",
    "Google",
    "阿里巴巴",
    "腾讯",
    "百度",
    "网易",
    "Microsoft",
    "字节跳动",
  ],
  data: dataWithMultiBar,
  config: {
    ...config,
    column: {
      position: "company*value",
      color: "company",
    },
  },
};
ColumnWithMulti.storyName = "多维度柱状图";
ColumnWithMulti.args = ColumnWithMultiArgs;
export const ColumnWithMultiExample = () => (
  <ColumnChart {...ColumnWithMultiArgs} />
);

export const ColumnWithGroup = Template.bind({});
const ColumnWithGroupArgs = {
  legends: ["Apple", { name: "Facebook", dashed: true }, "Google"],
  data: dataWithGroup,
  config: {
    ...config,
    column: {
      position: "type*value",
      color: "company",
      adjust: [
        {
          type: "dodge",
          marginRatio: 0,
        },
      ],
    },
  },
};
ColumnWithGroup.storyName = "分组多维度柱状图";
ColumnWithGroup.args = ColumnWithGroupArgs;
export const ColumnWithGroupExample = () => (
  <ColumnChart {...ColumnWithGroupArgs} />
);

export const StackingDiagramColumn = Template.bind({ title: "堆积图" });
const StackingDiagramColumnArgs = {
  legends: ["Apple", "Facebook", "Google"],
  data: dataWithGroup,
  config: {
    ...config,
    column: {
      position: "type*value",
      color: "company",
      adjust: "stack",
    },
  },
};
StackingDiagramColumn.storyName = "堆积多维度柱状图";
StackingDiagramColumn.args = StackingDiagramColumnArgs;
export const StackingDiagramColumnExample = () => (
  <ColumnChart {...StackingDiagramColumnArgs} />
);

export const PercentColumn = Template.bind({ title: "堆积图" });
const PercentColumnArgs = {
  legends: ["Apple", "Facebook", "Google"],
  data: percentData,
  config: {
    ...config,
    axis: [
      "value",
      {
        label: {
          formatter: (val: string) => {
            return `${val}%`;
          },
        },
      },
    ],
    column: {
      position: "type*value",
      color: "company",
      adjust: "stack",
    },
  },
};
PercentColumn.storyName = "百分比柱状图";
PercentColumn.args = PercentColumnArgs;
export const PercentColumnExample = () => (
  <ColumnChart {...PercentColumnArgs} />
);

export const GroupAndStackColumn = Template.bind({});
const GroupAndStackColumnArgs = {
  legends: [],
  data: dataWithGroupStack,
  config: {
    ...config,
    column: {
      position: "type*value",
      color: "company",
      adjust: "stack",
    },
  },
};
GroupAndStackColumn.storyName = "百分比柱状图1";
GroupAndStackColumn.args = GroupAndStackColumnArgs;
export const GroupAndStackColumnExample = () => (
  <ColumnChart {...GroupAndStackColumnArgs} />
);
