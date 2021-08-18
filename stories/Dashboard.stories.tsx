import { default as DashboardComponent } from "./charts/dashboard/Dashboard";

export default {
  title: "Charts/Dashboard",
  component: DashboardComponent,
  parameters: {
    docs: {
      page: null,
    },
  },
};

export const Dashboard = (args: any) => <DashboardComponent {...args} />;
