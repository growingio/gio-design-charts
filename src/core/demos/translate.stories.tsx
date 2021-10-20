import { ComponentStory } from '@storybook/react';
import { Area } from '../../area';
import { DesignContext } from '@gio-design/utils';
import { ErrorBoundary } from '../../boundary/demos/ErrorBoundary.stories';
import { useState } from 'react';

export default {
  title: 'Usage/Translate',
  component: Area,
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template: ComponentStory<typeof Area> = (args) => {
  const [code, setCode] = useState('zh');
  return (
    <>
      <button
        onClick={() => {
          setCode(code === 'en' ? 'zh' : 'en');
        }}
      >
        切换到{code === 'en' ? '中文' : '英文'}
      </button>
      <DesignContext.Provider value={{ locale: { code } }}>
        <Area {...args} />
      </DesignContext.Provider>
    </>
  );
};

export const Translate = Template.bind({});
Translate.args = ErrorBoundary.args;
