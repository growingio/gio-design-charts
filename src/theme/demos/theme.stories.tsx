import { colors } from '../index';

const Example = () => {
  return (
    <>
      <div>Theme Colors</div>
      {colors.map((color: string) => {
        return (
          <div
            style={{ backgroundColor: color, padding: '4px', borderRadius: 4, margin: 4, width: 300, color: '#fff' }}
          >
            {color}
          </div>
        );
      })}
    </>
  );
};

export default {
  title: 'Utils/Theme',
  component: Example,
  parameters: {
    docs: {
      page: null,
    },
  },
};

export const Theme = (args: any) => <Example {...args} />;
