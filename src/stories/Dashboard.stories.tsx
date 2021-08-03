import { default as DashboardComponent } from "./g2/dashboard/Dashboard";

export default {
  title: "Example/Dashboard",
  component: DashboardComponent,
  parameters: {
    docs: {
      page: null,
    },
  },
};

export const Dashboard = (args: any) => <DashboardComponent {...args} />;
