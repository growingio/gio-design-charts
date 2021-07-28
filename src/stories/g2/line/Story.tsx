import { ComponentStory } from "@storybook/react";
import LineChart from "../../../G2/components/LineChart";
import { dataWithDash, dataWithOneLine, dataWithMenu } from "./data";
import { LINEDASH_1 } from "../../../G2/interface";
import Card from "../../components/Card";

const Template: ComponentStory<typeof LineChart> = (args) => (
  <Card>
    <LineChart {...args} />
  </Card>
);

const config = {
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
};

export const LineWithOneLine = Template.bind({});
LineWithOneLine.args = {
  legends: ["北京"],
  data: dataWithOneLine,
  config,
};

export const LineWithDash = Template.bind({});
LineWithDash.args = {
  legends: [
    "长春",
    {
      name: "哈尔滨",
      lineDash: true,
    },
    {
      name: "石家庄",
      lineDash: LINEDASH_1,
    },
  ],
  data: dataWithDash,
  config,
};

export const LineWithMenu = Template.bind({});
LineWithMenu.args = {
  legends: [
    "北京",
    "上海",
    "深证",
    "郑州",
    "杭州",
    "兰州",
    "福州",
    "广州",
    "南宁",
    "长沙",
    "合肥",
    "南京",
    "长春",
    "哈尔滨",
    "石家庄",
  ],
  data: dataWithMenu,
  config,
};
