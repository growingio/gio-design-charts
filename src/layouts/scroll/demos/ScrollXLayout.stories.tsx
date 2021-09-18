import ScrollXLayout from '../ScrollXLayout';
import Docs from './Scroll.mdx';

import { FunnelWithGroup } from '../../../funnel/demos/Funnel.stories';

export default {
  title: 'Components/Layouts/Scroll X',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: ScrollXLayout,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

export const ScrollX = FunnelWithGroup;
