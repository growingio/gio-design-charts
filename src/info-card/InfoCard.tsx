import React from 'react';
import { ChartConfig } from '../interfaces';
import Item from './Item';

import './styles/infocard.less';

export interface InfoCardProps {
  title: string;
  data: any[];
  forwardKey: string;
  valueKey: string;
  trigger?: string;
  config?: ChartConfig;
  injectComponent?: any;
}

const InfoCard = (props: InfoCardProps) => {
  const { title, data = [], trigger, forwardKey, valueKey, config, injectComponent } = props;
  const renderTooltip = config?.tooltip?.render;
  const formatter = config?.tooltip?.formatter;
  return (
    <>
      {renderTooltip ? (
        renderTooltip({ title, data, trigger, forwardKey })
      ) : (
        <div data-testid="infoCard">
          <div className="gio-d-chart-infocard_title">{title}</div>
          {data.map((item: any) => (
            <div key={item.data?.[forwardKey] || 'empty-item'}>
              <Item data={item} forwardKey={forwardKey} formatter={formatter} valueKey={valueKey} />
            </div>
          ))}
          {injectComponent?.({ data, trigger, forwardKey })}
        </div>
      )}
    </>
  );
};

InfoCard.Item = Item;

export default InfoCard;
