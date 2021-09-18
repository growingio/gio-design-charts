import ScrollYLayout from '../ScrollYLayout';
import Docs from './Scroll.mdx';
import { ScrollBarMulti } from '../../../bar/demos/Bar.stories';

export default {
  title: 'Components/Layouts/Scroll Y',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: ScrollYLayout,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

export const ScrollY = ScrollBarMulti;
