import { ComponentStory } from "@storybook/react";
import BarChart from "../../../G2/components/BarChart";
import data from "./data";

const Template: ComponentStory<typeof BarChart> = (args) => (
  <BarChart {...args} />
);

const Bar = Template.bind({});
Bar.args = {
  legends: ["Apple", "Facebook", "Google"],
  data: data,
  config: {
    chart: {
      autoFit: true,
      height: 400,
    },
    scale: ["value", { nice: true }],
    tooltip: {
      enterable: true,
      showContent: true,
    },
    bar: {
      position: "type*value",
      color: "company",
    },
  },
};

export default Bar;
