export default {
  title: "Example/Charts",
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

// export { Dashboard } from "./g2/dashboard";

export {
  ColumnWithOne,
  ColumnWithMulti,
  ColumnWithGroup,
  StackingDiagramColumn,
  PercentColumn,
} from "./g2/column/Story";

export { LineWithOneLine, LineWithDash, LineWithMenu } from "./g2/line/Story";

export {
  BarDefault,
  BarWithGroup,
  StackingDiagramBar,
  PercentBar,
} from "./g2/bar/Story";

export { FunnelWithLink } from "./g2/funnel/Story";
