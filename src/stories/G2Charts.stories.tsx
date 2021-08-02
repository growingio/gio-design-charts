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
} from "./g2/line/Story";
