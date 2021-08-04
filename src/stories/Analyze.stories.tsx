import { default as DashboardComponent } from './charts/dashboard/Dashboard';

export default {
  title: '分析图表案例/Dashboard',
  component: DashboardComponent,
  parameters: {
    docs: {
      page: null,
    },
  },
};

export const Dashboard = (args: any) => <DashboardComponent {...args} />;
