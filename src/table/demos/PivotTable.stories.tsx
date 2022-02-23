import { Data } from '@antv/s2';
import { ComponentStory, Story } from '@storybook/react';
import { SheetProps } from '..';
import { DataTable } from '../sheet';
// import Docs from './Table.mdx';
import dataCfg from './pivot-data'
export default {
  title: 'DataTable/透视表 Pivot Table',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: DataTable,
  parameters: {
    // docs: {
    //   page: Docs,
    // },
  },
};

const Template: ComponentStory<typeof DataTable> = (args) => <div
  className='table-demo-box'>
  <DataTable {...args}></DataTable>
</div>
export const Default = Template.bind({});
const options = {
  width: 600,
  height: 480,
  debug: true,
  // showDefaultHeaderActionIcon: false,
  tooltip: {
    showTooltip: true,
    row: {
      showTooltip: false,
    },
  },
  // totals: {
  //   row: {
  //     showGrandTotals: true,
  //     showSubTotals: true,
  //     reverseLayout: true,
  //     reverseSubLayout: true,
  //     subTotalsDimensions: ['province'],
  //   },
  //   col: {
  //     showGrandTotals: true,
  //     showSubTotals: true,
  //     reverseLayout: true,
  //     reverseSubLayout: true,
  //     subTotalsDimensions: ['type'],
  //   },
  // },
};
Default.args = {
  options,
  dataConfig: {
    fields: {
      rows: ['province', 'city'],
      columns: ['type', 'sub_type'],
      values: ['number'],
      valueInCols: true,
    },
    meta: dataCfg.meta,
    data: dataCfg.data,
    totalData: dataCfg.totalData as unknown as Data[]
  },

};
export const Tree: ComponentStory<typeof DataTable> = () => {
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'tree',

    },
    dataConfig: {
      fields: {
        rows: ['province', 'city'],
        columns: ['type', 'sub_type'],
        values: ['number'],
        valueInCols: true,
      },
      meta: dataCfg.meta,
      data: dataCfg.data,
      totalData: dataCfg.totalData as any
    }
  }
  return (<div className='table-demo-box'>
    <DataTable {...props}></DataTable>
  </div>)
}

export const CustomTheme = () => {
  const customTheme = {
    splitLine: {
      horizontalBorderColor: '#ADB2C2',
      horizontalBorderColorOpacity: 0.2,
      horizontalBorderWidth: 4,
      verticalBorderColor: '#ADB2C2',
      verticalBorderColorOpacity: 0.2,
      verticalBorderWidth: 4,
      showShadow: true,
      shadowWidth: 8,
      shadowColors: {
        left: 'rgba(0,0,0,0.1)',
        right: 'rgba(0,0,0,0)',
      },
    },
  }
  const props: SheetProps = {
    type: 'pivot',
    options: {
      width: 600,
      height: 480,
      hierarchyType: 'tree',
    },
    dataConfig: {
      fields: {
        rows: ['province', 'city'],
        columns: ['type', 'sub_type'],
        values: ['number'],
        valueInCols: true,
      },
      meta: dataCfg.meta,
      data: dataCfg.data,
      totalData: dataCfg.totalData as any
    },
    themeConfig: { theme: customTheme }
  }
  return (<div className='table-demo-box'>
    <DataTable {...props}></DataTable>
  </div>)
}