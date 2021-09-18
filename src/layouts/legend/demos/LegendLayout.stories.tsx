import LegendLayout from '../LegendLayout';
import Docs from './Legend.mdx';

import { PercentArea } from '../../../area/demos/Area.stories';

export default {
  title: 'Components/Layouts/Legend',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: LegendLayout,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

export const Example = PercentArea;
