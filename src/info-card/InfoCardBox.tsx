import React from 'react';
import { ChartConfig, ChartOptions, Legends, Legend } from '../interfaces';
import { getInfoCardStyles, getLegendStyles } from '../utils/styles';
import InfoCard from './InfoCard';
import { first, last, set } from 'lodash';

import './styles/infocard.less';
import { LooseObject } from '@antv/g-base';
import { TooltipItem } from '@antv/g2/lib/interface';
import { ChartType } from '..';

export interface TriggerItem extends Omit<TooltipItem, 'color'> {
  title?: string;
  color?: string;
}

export interface InfoCardData extends Legend {
  data: LooseObject;
  type: ChartType;
  styles: LooseObject;
  column?: LooseObject;
}

export interface InfoCardProps {
  legends: Legends;
  trigger?: string;
  triggerItems: TriggerItem[];
  options: ChartOptions;
  config: ChartConfig;
  injectComponent?: (options: { data: LooseObject; trigger?: string; forwardKey: string }) => JSX.Element;
}

const InfoCardBox = (props: InfoCardProps) => {
  const { triggerItems, legends = {}, trigger, options, config } = props;
  const chartType = config?.type;
  const forwardKey = config?.[chartType]?.color;
  const splitPositions = config?.[chartType]?.position?.split('*');
  const nameKey = first(splitPositions) as string;
  const valueKey = last(splitPositions) as string;
  const items: InfoCardData[] =
    triggerItems?.map((item: TriggerItem): InfoCardData => {
      if (!item) {
        return {} as InfoCardData;
      }
      const [legend, color] = getInfoCardStyles(options, config, item, legends, nameKey);
      // Set color for trigger item, it will change the point color when mouseover the column bar
      item.color = color;
      const itemData = item.data;
      set(item, 'mappingData.color', color);
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

  // Though it will run many times when items are changed.
  // That is expected to update items, it seams it's better to direct use without useEffect.
  const title = (items[0] as LooseObject)?.data?.[nameKey] || triggerItems?.[0]?.name || '';
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
