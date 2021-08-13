import React from 'react';
import { IChartConfig, IChartOptions, ILegends } from '../../interface';
import { getLegendStyles } from '../utils/styles';
import InfoCard from './InfoCard';
import Item from './Item';

import './styles/infocard.less';

export interface IInfoCardProps {
  legends: ILegends;
  trigger?: string | undefined;
  triggerItems: any[];
  options?: IChartOptions;
  config?: IChartConfig;
  injectComponent?: any;
}

const InfoCardBox = (props: IInfoCardProps) => {
  const { triggerItems, legends = {}, trigger, options, config } = props;
  const defaultStyles = options?.defaultStyles;
  const forwardKey = config?.[config?.type]?.color;

  // Though it will run many times when items are changed.
  // That is expected to update items, it seams it's better to direct use without useEffect.
  const title = triggerItems?.[0]?.name || '';
  const items =
    triggerItems?.map((item: any) => {
      const legend = legends?.[item?.name] || {};
      const color = legend?.color || defaultStyles?.color || item?.color;
      // Set color for trigger item, it will change the point color when mouseover the column bar
      item.color = color;
      const itemData = item?.data;
      const legendStyles = getLegendStyles(legend, color);
      if (itemData.prev) {
        return { ...legend, data: { ...itemData.prev }, type: config?.type, styles: { ...legendStyles, opacity: 0.2 } };
      }
      return { ...legend, data: { ...itemData }, type: config?.type, styles: legendStyles };
    }) || [];
  return (
    <div className="gio-d-chart-infocard">
      <InfoCard title={title} data={items} trigger={trigger} forwardKey={forwardKey} config={config} />
    </div>
  );
};

export default InfoCardBox;
