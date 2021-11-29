import { LooseObject } from '@antv/component';
import { ChartConfig } from '../interfaces';
import { InfoCardData } from './InfoCardBox';
import Item from './Item';

import './styles/infocard.less';

export interface InfoCardProps {
  title: string;
  subTitle?: string;
  data: InfoCardData[];
  forwardKey: string;
  valueKey: string;
  formatter?: (value: string | number) => string | number;
  trigger?: string;
  config?: ChartConfig;
  injectComponent?: (options: { data: LooseObject; trigger?: string; forwardKey: string }) => JSX.Element;
}

const InfoCard = (props: InfoCardProps) => {
  const {
    title,
    subTitle,
    data = [],
    trigger,
    forwardKey,
    valueKey,
    config,
    injectComponent,
    formatter: propFormatter,
  } = props;
  const renderTooltip = config?.tooltip?.render;
  const tooltipFormatter = config?.tooltip?.formatter;

  const formatter = tooltipFormatter || propFormatter;
  return (
    <>
      {renderTooltip ? (
        renderTooltip({ title, data, trigger, forwardKey, formatter })
      ) : (
        <div data-testid="infoCard" key="default-infocard">
          {title && <div className="gio-d-charts-infocard_title">{title}</div>}
          {subTitle && <div className="gio-d-charts-infocard_subtitle">{subTitle}</div>}
          {data.map((item: InfoCardData, index: number) => (
            <div key={`${item.data?.[forwardKey]}-${index}` || `empty-item-${index}`}>
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
