import { ComponentStory } from "@storybook/react";
import LineChart from "../../../charts/LineChart";
import { dataWithDash, dataWithOneLine, dataWithMenu } from "./data";
import Card from "../../components/Card";
import { DEFAULT_LINEDASH } from "../../../theme";

const Template: ComponentStory<typeof LineChart> = (args) => (
  <Card>
    <LineChart {...args} />
  </Card>
);

const config = {
  chart: {
    autoFit: true,
    height: 300,
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
    enterable: true,
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
const LineWithOneLineArgs = {
  legends: ["北京"],
  data: dataWithOneLine,
  config,
};
LineWithOneLine.args = { ...LineWithOneLineArgs };

export const LineWithOneLineExample = () => (
  <LineChart {...LineWithOneLineArgs} />
);

export const LineWithDash = Template.bind({});
const LineWithDashArgs = {
  legends: [
    "长春",
    {
      name: "哈尔滨",
      lineDash: true,
    },
    {
      name: "石家庄",
      lineDash: DEFAULT_LINEDASH,
    },
  ],
  data: dataWithDash,
  config,
};
LineWithDash.args = { ...LineWithDashArgs };

export const LineWithDashExample = () => <LineChart {...LineWithDashArgs} />;

export const LineWithMenu = Template.bind({});
const LineWithMenuArgs = {
  legends: [
    "北京的天气真热啊",
    "上海",
    "深证",
    "郑州的雨下的真大",
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
LineWithMenu.args = { ...LineWithMenuArgs };

export const LineWithMenuExample = () => <LineChart {...LineWithMenuArgs} />;
