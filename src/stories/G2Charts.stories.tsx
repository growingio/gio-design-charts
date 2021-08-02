export default {
  title: "Example/G2 Charts",
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export { Dashboard } from "./g2/dashboard";

export {
  ColumnWithOne as BasicColumn,
  ColumnWithMulti as MultiColumn,
  ColumnWithGroup as BasicGroupColumn,
  StackingDiagramColumn,
  PercentColumn,
} from "./g2/column/Story";
export {
  LineWithOneLine as BasicLine,
  LineWithDash as DashedLine,
  LineWithMenu as MultiLegendLine,
  LineWithArea as AreaLine,
  LineWithMultiArea as MultiAreaLine
} from "./g2/line/Story";

export {
  BarDefault as BasicBar,
  BarWithGroup as GroupBar,
  StackingDiagramBar,
  PercentBar,
} from "./g2/bar/Story";

export { FunnelWithLink } from "./g2/funnel/Story";
