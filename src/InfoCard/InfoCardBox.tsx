import React from 'react';
import { ChartConfig, ChartOptions, Legends } from '../interface';
import { getLegendStyles } from '../utils/styles';
import InfoCard from './InfoCard';
import { last } from 'lodash';

import './styles/infocard.less';

export interface InfoCardProps {
  legends: Legends;
  trigger?: string;
  triggerItems: any[];
  options?: ChartOptions;
  config?: ChartConfig;
  injectComponent?: any;
}

const InfoCardBox = (props: InfoCardProps) => {
  const { triggerItems, legends = {}, trigger, options, config } = props;
  const defaultStyles = options?.defaultStyles;
  const chartType = config?.type;
  const forwardKey = config?.[chartType]?.color;
  const valueKey = last(config?.[chartType]?.position?.split('*')) as string;

  // Though it will run many times when items are changed.
  // That is expected to update items, it seams it's better to direct use without useEffect.
  const title = triggerItems?.[0]?.name || '';
  const items =
    triggerItems?.map((item: any) => {
      if (!item) {
        return {};
      }
      const legend = legends?.[item.name] || {};
      const color = legend.color || defaultStyles?.color || item.color;
      // Set color for trigger item, it will change the point color when mouseover the column bar
      item.color = color;
      const itemData = item.data;
      const legendStyles = getLegendStyles(legend, color);
      if (itemData?.prev) {
        return {
          ...legend,
          data: { ...itemData.prev },
          type: chartType,
          styles: { ...legendStyles, opacity: 0.2 },
          column: { ...itemData.column },
        };
      }
      return { ...legend, data: { ...itemData }, type: chartType, styles: legendStyles };
    }) || [];
  return (
    <div className="gio-d-chart-infocard" data-testid="infoCardBox">
      <InfoCard
        title={title}
        data={items}
        trigger={trigger}
        forwardKey={forwardKey}
        valueKey={valueKey}
        config={config}
      />
    </div>
  );
};

export default InfoCardBox;
