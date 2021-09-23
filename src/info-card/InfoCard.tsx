import { LooseObject } from '@antv/component';
import React from 'react';
import { ChartConfig } from '../interfaces';
import Item from './Item';

import './styles/infocard.less';

export interface InfoCardProps {
  title: string;
  data: LooseObject[];
  forwardKey: string;
  valueKey: string;
  formatter?: any;
  trigger?: string;
  config?: ChartConfig;
  injectComponent?: (options: { data: LooseObject; trigger?: string; forwardKey: string }) => JSX.Element;
}

const InfoCard = (props: InfoCardProps) => {
  const { title, data = [], trigger, forwardKey, valueKey, config, injectComponent, formatter: propFormatter } = props;
  const renderTooltip = config?.tooltip?.render;
  const tooltipFormatter = config?.tooltip?.formatter;

  const formatter = tooltipFormatter || propFormatter;
  return (
    <>
      {renderTooltip ? (
        renderTooltip({ title, data, trigger, forwardKey, formatter })
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
