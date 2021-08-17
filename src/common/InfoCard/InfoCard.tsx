import React from 'react';
import { ChartConfig } from '../../interface';
import Item from './Item';

import './styles/infocard.less';

export interface InfoCardProps {
  title: string;
  data: any[];
  forwardKey: string;
  trigger?: string | undefined;
  config?: ChartConfig;
  injectComponent?: any;
}

const InfoCard = (props: InfoCardProps) => {
  const { title, data = [], trigger, forwardKey, config, injectComponent } = props;
  const renderTooltip = config?.tooltip?.render;
  return (
    <>
      {renderTooltip ? (
        renderTooltip?.({ title, data, trigger, forwardKey })
      ) : (
        <>
          <div className="gio-d-chart-infocard_title">{title}</div>
          {data.map((item: any) => {
            // item.color = defaultStyles?.color || item.color;
            return (
              <div key={item?.data?.[forwardKey]}>
                <Item data={item} forwardKey={forwardKey} />
              </div>
            );
          })}
          {injectComponent?.({ data, trigger, forwardKey })}
        </>
      )}
    </>
  );
};

InfoCard.Item = Item;

export default InfoCard;
