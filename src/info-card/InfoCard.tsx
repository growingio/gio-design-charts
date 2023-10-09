import { LooseObject } from '@antv/component';
import { ChartConfig } from '../interfaces';
import { InfoCardData } from './InfoCardBox';
import Item from './Item';

import './styles/infocard.less';
import { TriggerInfo } from '../hooks/useInterceptors';

export interface InfoCardProps {
  title: string;
  subTitle?: string;
  data: InfoCardData[];
  forwardKey: string;
  valueKey: string;
  formatter?: (value: string | number) => string | number;
  triggerInfo?: TriggerInfo;
  config?: ChartConfig;
  injectComponent?: (options: {
    data: LooseObject;
    trigger?: string;
    triggerInfo?: TriggerInfo;
    forwardKey: string;
  }) => JSX.Element;
}

const InfoCard = (props: InfoCardProps) => {
  const {
    title,
    subTitle,
    data = [],
    triggerInfo,
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
        renderTooltip({ title, data, trigger: triggerInfo?.type, triggerInfo, forwardKey, formatter })
      ) : (
        <div data-testid="infoCard" key="default-infocard">
          {title && (
            <div className="gio-d-charts-infocard_title" title={title}>
              {title}
            </div>
          )}
          {subTitle && (
            <div className="gio-d-charts-infocard_subtitle" title={subTitle}>
              {subTitle}
            </div>
          )}
          <div className="gio-d-charts-infocard_label-content">
            {data.map((item: InfoCardData, index: number) => (
              <div key={`${item.data?.[forwardKey]}-${index}`}>
                <Item
                  data={item}
                  forwardKey={(forwardKey || item.xField) as string}
                  formatter={formatter}
                  valueKey={valueKey || item.yField}
                />
              </div>
            ))}
          </div>
          {injectComponent?.({ data, trigger: triggerInfo?.type, triggerInfo, forwardKey })}
        </div>
      )}
    </>
  );
};

InfoCard.Item = Item;

export default InfoCard;
