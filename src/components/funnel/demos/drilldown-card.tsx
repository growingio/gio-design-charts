import React from 'react';
import { InfoCard } from '../../../common/InfoCard';
import './drilldown-card.less';

const DrilldownCard = ({ options }: any) => {
  const { trigger, title } = options
  const infoType = options.data[0]?.column ? 'outflow' : 'covert'
  const realTitle = title + (infoType === 'covert' ? ' - 转化' : ' - 流失')

  const realData = infoType === 'covert' ? [
    { data: { type: '转化率', value: options.data[0]?.data.convertRate } },
    { data: { type: '转化人数', value: options.data[0]?.data.value } }
  ] : [
    { data: { type: '流失率', value: 1 - options.data[0]?.column.convertRate } },
    { data: { type: '流失人数', value: options.data[0]?.data.value -  options.data[0]?.column.value} }
  ]
  const clickContent = (
    <div style={{ textAlign: 'center', fontSize: 16, lineHeight: '20px' }}>
      <div>
        <button className="segment">创建分群</button>
      </div>
      <div>
        <button className="download">下载分群列表</button>
      </div>
    </div>
  )
  return (
    <div className="drilldown-tooltip">
      <InfoCard
        {...options}
        title={realTitle}
        data={realData}
        injectComponent={() => trigger === 'click' ? clickContent : null}
      />
    </div>
  );
};

export default DrilldownCard;
