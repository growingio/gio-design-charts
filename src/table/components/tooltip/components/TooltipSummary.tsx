import React from 'react';
import { size, reduce } from 'lodash';
import { SummaryProps } from '@antv/s2';
import cls from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { TOOLTIP_PREFIX_CLS } from '../../../common'
import { useIntl } from 'react-intl'

export const TooltipSummary: React.FC<SummaryProps> = React.memo((props) => {
  const { summaries = [] } = props;
  const { formatMessage } = useIntl()
  const prefixCls = usePrefixCls(TOOLTIP_PREFIX_CLS)
  const renderSelected = () => {
    const count = reduce(
      summaries,
      (pre, next) => pre + size(next?.selectedData),
      0,
    );
    return (
      <div className={`${prefixCls}-summary-item`}>
        <span className={`${prefixCls}-selected`}>
          {count} {formatMessage({ defaultMessage: '项', id: 'DataTable.item', description: 'DataTable summary tooltip' })}
        </span>
        {formatMessage({ defaultMessage: '已选择', id: 'DataTable.selected', description: 'DataTable summary tooltip' })}
      </div>
    );
  };

  const renderSummary = () => {
    return summaries?.map((item) => {
      const { name = '', value } = item || {};
      if (!name && !value) {
        return null;
      }

      return (
        <div
          key={`${name}-${value}`}
          className={`${prefixCls}-summary-item`}
        >
          <span className={`${prefixCls}-summary-key`}>
            {name}（{formatMessage({ defaultMessage: '总和', id: 'DataTable.sum', description: 'DataTable summary tooltip' })})
          </span>
          <span
            className={cls(
              `${prefixCls}-summary-val`,
              `${prefixCls}-bold`,
            )}
          >
            {value}
          </span>
        </div>
      );
    });
  };

  return (
    <div className={`${prefixCls}-summary`}>
      {renderSelected()}
      {renderSummary()}
    </div>
  );
});
