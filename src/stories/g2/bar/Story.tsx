import { ComponentStory } from "@storybook/react";
import BarChart from "../../../charts/BarChart";
import Card from "../../components/Card";
import {
  dataWithGroup,
  dataWithGroupStack,
  dataWithMultiBar,
  dataWithOneBar,
  percentData,
} from "./data";

const Template: ComponentStory<typeof BarChart> = (args) => (
  <Card>
    <BarChart {...args} />
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

export const BarWithOne = Template.bind({});
const BarWithOneArgs = {
  legends: ["Apple"],
  data: dataWithOneBar,
  config: {
    ...config,
    bar: {
      position: "type*value",
      color: "company",
    },
  },
};
BarWithOne.args = { ...BarWithOneArgs };
export const BarWithOneExample = () => <BarChart {...BarWithOneArgs} />;

export const BarWithMulti = Template.bind({});
const BarWithMultiArgs = {
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
    bar: {
      position: "company*value",
      color: "company",
    },
  },
};
BarWithMulti.args = BarWithMultiArgs;
export const BarWithMultiExample = () => <BarChart {...BarWithMultiArgs} />;

export const BarWithGroup = Template.bind({});
const BarWithGroupArgs = {
  legends: ["Apple", { name: "Facebook", dashed: true }, "Google"],
  data: dataWithGroup,
  config: {
    ...config,
    bar: {
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
BarWithGroup.args = BarWithGroupArgs;
export const BarWithGroupExample = () => <BarChart {...BarWithGroupArgs} />;

export const StackingDiagramBar = Template.bind({ title: "堆积图" });
const StackingDiagramBarArgs = {
  legends: ["Apple", "Facebook", "Google"],
  data: dataWithGroup,
  config: {
    ...config,
    bar: {
      position: "type*value",
      color: "company",
      adjust: "stack",
    },
  },
};
StackingDiagramBar.args = StackingDiagramBarArgs;
export const StackingDiagramBarExample = () => (
  <BarChart {...StackingDiagramBarArgs} />
);

export const PercentBar = Template.bind({ title: "堆积图" });
const PercentBarArgs = {
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
    bar: {
      position: "type*value",
      color: "company",
      adjust: "stack",
    },
  },
};
PercentBar.args = PercentBarArgs;
export const PercentBarExample = () => <BarChart {...PercentBarArgs} />;

export const GroupAndStackBar = Template.bind({});
const GroupAndStackBarArgs = {
  legends: [],
  data: dataWithGroupStack,
  config: {
    ...config,
    bar: {
      position: "type*value",
      color: "company",
      adjust: "stack",
    },
  },
};
GroupAndStackBar.args = GroupAndStackBarArgs;
export const GroupAndStackBarExample = () => (
  <BarChart {...GroupAndStackBarArgs} />
);
