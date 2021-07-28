export default {
  title: "Example/G2 Charts",
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export {
  BarWithOne as BasicBar,
  BarWithMulti as MultiBar,
  BarWithGroup as BasicGroupBar,
} from "./g2/bar/Story";
export {
  LineWithOneLine as BasicLine,
  LineWithDash as DashedLine,
  LineWithMenu as MultiLegendLine,
} from "./g2/line/Story";
