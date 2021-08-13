import React from 'react';
import { IChartConfig, IChartOptions, ILegends } from '../../interface';
import { getLegendStyles } from '../utils/styles';
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

const InfoCard = (props: IInfoCardProps) => {
  const { triggerItems, legends = {}, trigger, options, config, injectComponent } = props;
  const defaultStyles = options?.defaultStyles;
  const forwardKey = config?.[config?.type]?.color;
  const renderTooltip = config?.tooltip?.render;

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
      {renderTooltip ? (
        renderTooltip?.({ data: items, trigger, forwardKey })
      ) : (
        <>
          <div className="gio-d-chart-infocard_title">{title}</div>
          {items.map((item: any) => {
            // item.color = defaultStyles?.color || item.color;
            return (
              <div key={item?.data?.[forwardKey]}>
                <Item data={item} forwardKey={forwardKey} />
              </div>
            );
          })}
          {injectComponent?.({ data: items, trigger, forwardKey })}
        </>
      )}
    </div>
  );
};

InfoCard.Item = Item;

export default InfoCard;
