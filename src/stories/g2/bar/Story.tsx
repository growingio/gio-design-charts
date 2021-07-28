import { ComponentStory } from "@storybook/react";
import BarChart from "../../../G2/components/BarChart";
import Card from "../../components/Card";
import { dataWithGroup, dataWithMultiBar, dataWithOneBar } from "./data";

const Template: ComponentStory<typeof BarChart> = (args) => (
  <Card>
    <BarChart {...args} />
  </Card>
);

const config = {
  chart: {
    autoFit: true,
    height: 400,
  },
  scale: ["value", { nice: true }],
  tooltip: {
    enterable: true,
    showContent: true,
  },
};

export const BarWithOne = Template.bind({});
BarWithOne.args = {
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

export const BarWithMulti = Template.bind({});
BarWithMulti.args = {
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
      // color: "company",
    },
  },
};

export const BarWithGroup = Template.bind({});
BarWithGroup.args = {
  legends: ["Apple", "Facebook", "Google"],
  data: dataWithGroup,
  config: {
    ...config,
    bar: {
      position: "type*value",
      color: "company",
    },
  },
};
