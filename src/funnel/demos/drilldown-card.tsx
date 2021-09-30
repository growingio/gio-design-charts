import { LooseObject } from '@antv/component';
import React from 'react';
import { formatNumber, formatPercent } from '../../utils/formatNumber';
import { InfoCard } from '../../info-card';
import './drilldown-card.less';

const DrilldownCard = ({ options }: LooseObject) => {
  const { trigger, title } = options;
  const infoType = options.data[0]?.column ? 'outflow' : 'covert';
  const realTitle = title + (infoType === 'covert' ? ' - 转化' : ' - 流失');

  const dataOptions = options.data[0] || {};

  const realData =
    infoType === 'covert'
      ? [
          { ...dataOptions, data: { type: '转化率', value: formatPercent(options.data[0]?.data.value) } },
          { ...dataOptions, data: { type: '转化人数', value: formatNumber(options.data[0]?.data.count) } },
        ]
      : [
          { ...dataOptions, data: { type: '流失率', value: formatPercent(1 - options.data[0]?.column.value) } },
          {
            ...dataOptions,
            data: {
              type: '流失人数',
              value: formatNumber(options.data[0]?.data.count - options.data[0]?.column.count),
            },
          },
        ];
  const clickContent = (
    <div style={{ textAlign: 'center', fontSize: 16, lineHeight: '20px' }}>
      <div>
        <button className="segment">创建分群</button>
      </div>
      <div>
        <button className="download">下载分群列表</button>
      </div>
    </div>
  );
  return (
    <div className="drilldown-tooltip">
      <InfoCard
        {...options}
        title={realTitle}
        data={realData}
        injectComponent={() => (trigger === 'click' ? clickContent : null)}
      />
    </div>
  );
};

export default DrilldownCard;
