import React, { useEffect, useState, useMemo } from 'react';
import { ChartConfig, ChartOptions, Legends, Legend, ChartType } from '../interfaces';
import { getInfoCardStyles, getLegendStyles } from '../utils/styles';
import InfoCard from './InfoCard';
import { debounce, first, get, last, set } from 'lodash';

import './styles/infocard.less';
import { LooseObject } from '@antv/g-base';
import { TooltipItem } from '@antv/g2/lib/interface';
import { LegendObject } from '../legends/useLegends';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { getAxisFields } from '../utils/frameworks/axis';
import { TriggerInfo } from '../hooks/useInterceptors';

export interface TriggerItem extends Omit<TooltipItem, 'color'> {
  title?: string;
  color?: string;
  type?: ChartType;
  xField?: string;
  yField?: string;
}

export interface InfoCardData extends Legend {
  data: LooseObject;
  type: ChartType;
  styles: LooseObject;
  column?: LooseObject;
  xField?: string;
  yField?: string;
}

export interface InfoCardProps {
  legendObject: LegendObject;
  getTrigger?: () => TriggerInfo;
  // triggerItems: TriggerItem[];
  acceptor: any;
  options: ChartOptions;
  config: ChartConfig;
  setTrigger?: (trigger: string) => void;
  injectComponent?: (options: { data: LooseObject; trigger?: string; forwardKey: string }) => JSX.Element;
}

const InfoCardBox = (props: InfoCardProps) => {
  const { acceptor, legendObject, getTrigger, options, config, setTrigger } = props;
  const chartType = config?.type === ChartType.DoubleAxes ? ChartType.COLUMN : config?.type;
  const forwardKey = config?.[chartType]?.color;
  const height = config?.chart?.height || 360;
  const splitPositions = config?.[chartType]?.position?.split('*');
  const nameKey = first(splitPositions) as string;
  const valueKey = last(splitPositions) as string;
  const [items, setItems] = useState<InfoCardData[]>([]);
  const [title, setTitle] = useState('');
  const setHoverItemD = useMemo(() => debounce(setItems, 20), [setItems]);

  const tipClassName = get(config, 'tooltip.className');

  const [, update] = useState(0);

  const triggerInfo = getTrigger?.();

  /* istanbul ignore next */
  const onMouseLeave = () => {
    setTrigger?.('mouseover');
    update(new Date().getTime());
  };

  useEffect(() => {
    acceptor((triggerItems: any) => {
      let fixedItems = triggerItems;

      // 对于双轴图，在tooltip shared模式下，triggerItems中包含折线图和柱状图的两种数据；
      // 但在绘制双轴图时，折线图和柱状图使用的数据时相同的，所以需要在这里去重，只需要保留柱状图部分的数据即可；
      // if (config?.tooltip?.shared && config?.type === ChartType.DoubleAxes) {
      //   fixedItems = fixedItems.filter((item: any) => legendObject.getLegend(item.name)?.type === ChartType.DoubleAxes);
      // }
      fixedItems = fixedItems.map((item: any) => {
        const legend = legendObject.getLegend(item.name);
        item.type = legend?.type || config?.type;
        let shapeConfig = getShapeConfig(config, item.type);

        // 双y轴折线图（line + line2）：两条折线分布在不同 y 轴上，
        // 需要根据 item 所属的颜色字段判断它属于 line 还是 line2，从而读取对应的 y 轴字段
        const axis2Cfg = (config as ChartConfig)?.line2 || (config as ChartConfig)?.column2;
        if (axis2Cfg && item?.data?.[axis2Cfg.color] === item.name) {
          shapeConfig = axis2Cfg;
        }
        const [, yField] = getAxisFields(shapeConfig.position);
        item.xField = shapeConfig.color;
        item.yField = yField;
        return item;
      });

      const covertItems: InfoCardData[] =
        fixedItems?.map((item: TriggerItem): InfoCardData => {
          if (!item) {
            return {} as InfoCardData;
          }
          let [legend, color] = getInfoCardStyles(options, config, item, legendObject, nameKey);
          const axis2Cfg = (config as ChartConfig)?.line2 || (config as ChartConfig)?.column2;
          if (axis2Cfg && item?.data?.[axis2Cfg.color] === item.name) {
            [legend, color] = getInfoCardStyles(options, { ...config, line: (config as ChartConfig)?.line2 ? axis2Cfg: null, column: (config as ChartConfig)?.column2 ? axis2Cfg: null }, item, legendObject, nameKey);
          }
          // Set color for trigger item, it will change the point color when mouseover the column bar
          item.color = color;
          const itemData = item.data;
          set(item, 'mappingData.color', color);
          const legendStyles = getLegendStyles(legend, color);
          if (itemData?.prev) {
            return {
              ...legend,
              data: { ...itemData.prev },
              type: item?.type || chartType,
              styles: { ...legendStyles, opacity: 0.2 },
              column: { ...itemData.column },
              xField: item?.xField,
              yField: item?.yField,
            };
          }
          return {
            ...legend,
            data: { ...itemData },
            type: item?.type || chartType,
            styles: legendStyles,
            xField: item?.xField,
            yField: item?.yField,
          };
        }) || [];
      const showTitle = (triggerItems?.[0] as LooseObject)?.data?.[nameKey] || triggerItems?.[0]?.name || '';
      setTitle(showTitle);
      setItems(covertItems);
    });
  }, [acceptor, chartType, nameKey, legendObject, options, config, setHoverItemD]);

  // Though it will run many times when items are changed.
  // That is expected to update items, it seams it's better to direct use without useEffect.
  return (
    <div
      className={`gio-d-charts-infocard ${tipClassName}`}
      data-testid="infoCardBox"
      onMouseLeave={onMouseLeave}
      style={{ maxHeight: (height - 60) * 0.75 }}
    >
      <InfoCard
        title={title}
        data={items}
        triggerInfo={triggerInfo}
        forwardKey={forwardKey}
        valueKey={valueKey}
        config={config}
      />
    </div>
  );
};

export default InfoCardBox;
