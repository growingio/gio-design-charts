import { ComponentStory } from "@storybook/react";
import FunnelChart from "../../../charts/FunnelChart";
import Card from "../../components/Card";
import { dataWithMultiBar } from "../column/data";

const Template: ComponentStory<typeof FunnelChart> = (args) => (
  <Card>
    <FunnelChart {...args} />
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

export const FunnelWithLink = Template.bind({});
const FunnelWithLinkArgs = {
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
    funnel: {
      position: "company*value",
      color: "company",
    },
  },
};
FunnelWithLink.storyName = "漏斗图探索";
FunnelWithLink.args = FunnelWithLinkArgs;
export const FunnelWithLinkExample = () => (
  <FunnelChart {...FunnelWithLinkArgs} />
);
