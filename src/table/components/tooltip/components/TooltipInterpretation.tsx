import React from 'react';
import { TooltipInterpretationOptions } from '@antv/s2';
import { Icon } from './TooltipIcon';
import { ReactElement } from '../../icons/reactElement';
import { TOOLTIP_PREFIX_CLS } from '../../../common'
import { usePrefixCls } from '@gio-design/utils';

export const Interpretation = (props: TooltipInterpretationOptions) => {
  const { name, icon, text, render } = props;
  const clsPrefix = usePrefixCls(TOOLTIP_PREFIX_CLS);
  const renderName = () => {
    return (
      name && (
        <span className={`${clsPrefix}-interpretation-name`}>
          {name}
        </span>
      )
    );
  };

  const renderText = () => {
    return text && <div>{text}</div>;
  };

  const renderElement = () => {
    return <ReactElement content={render} />;
  };

  return (
    <div className={`${clsPrefix}-interpretation`}>
      <div className={`${clsPrefix}-interpretation-head`}>
        <Icon
          icon={icon}
          className={`${clsPrefix}-interpretation-icon`}
        />
        {renderName()}
      </div>
      {renderText()}
      {renderElement()}
    </div>
  );
};
