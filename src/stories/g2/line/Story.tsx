import { ComponentStory } from "@storybook/react";
import LineChart from "../../../G2/components/LineChart";
import data from "./data";
import { LINEDASH_1 } from "../../../G2/interface";

const Template: ComponentStory<typeof LineChart> = (args) => (
  <LineChart {...args} />
);

const Line = Template.bind({});
Line.args = {
  legends: [
    "Tokyo",
    {
      name: "London",
      lineDash: LINEDASH_1,
    },
  ],
  data: data,
  config: {
    chart: {
      autoFit: true,
      height: 400,
    },
    scale: [
      {
        month: {
          range: [0, 1],
        },
        temperature: {
          nice: true,
        },
      },
    ],
    tooltip: {
      showCrosshairs: true,
      shared: true,
    },
    axis: [
      "temperature",
      {
        label: {
          formatter: (val: string) => {
            return val + " °C";
          },
        },
      },
    ],
    line: {
      position: "month*temperature",
      color: "city",
    },
  },
};

export default Line;
