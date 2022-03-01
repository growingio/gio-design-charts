import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import {
  ListItem,
  TooltipOperatorOptions,
  TooltipSummaryOptions,
  TooltipNameTipsOptions,
  TooltipHeadInfo as TooltipHeadInfoType,
  TooltipInterpretationOptions,
  getTooltipDefaultOptions,
} from '@antv/s2';
import { TooltipDetail } from './components/TooltipDetail';
import { Divider } from './components/TooltipDivider';
import { TooltipHead } from './components/TooltipHead';
import { TooltipInfos } from './components/TooltipInfos';
import { Interpretation } from './components/TooltipInterpretation';
import { TooltipOperator } from './components/operator';
import { SimpleTips } from './components/SimpleTips';
import { TooltipSummary } from './components/TooltipSummary';
import { TooltipRenderProps } from './interfaces';

import './index.less';
import { DesignContext } from '@gio-design/utils';
import { IntlProvider } from 'react-intl';
import en from '../../../locales/en.json';
const MESSAGES: { [key: string]: any; } = {
  'en-US': en,
  en: en,
  'zh-CN': {},
  zh: {},
};
export const TooltipComponent: React.FC<TooltipRenderProps> = (props) => {
  const { data, options, content } = props;
  const context = useContext(DesignContext);
  const localeCode = context?.locale?.code || 'zh-CN';
  const renderDivider = () => {
    return <Divider />;
  };

  const renderOperation = (
    operator?: TooltipOperatorOptions,
    onlyMenu: boolean = true,
  ) => {
    return (
      operator ? (
        <TooltipOperator
          onClick={operator.onClick}
          menus={operator.menus}
          onlyMenu={onlyMenu}
        />
      ) : null
    );
  };

  const renderNameTips = (nameTip: TooltipNameTipsOptions) => {
    const { name, tips } = nameTip || {};
    return <SimpleTips name={name} tips={tips} />;
  };

  const renderSummary = (summaries?: TooltipSummaryOptions[]) => {
    return !isEmpty(summaries) && <TooltipSummary summaries={summaries || []} />;
  };

  const renderHeadInfo = (headInfo?: TooltipHeadInfoType) => {
    const { cols, rows } = headInfo || {};

    return (
      (!isEmpty(cols) || !isEmpty(rows)) && (
        <>
          {renderDivider()}
          <TooltipHead cols={cols} rows={rows} />
        </>
      )
    );
  };

  const renderDetail = (details?: ListItem[]) => {
    return details && !isEmpty(details) && <TooltipDetail list={details} />;
  };

  const renderInfos = (infos?: string) => {
    return infos && <TooltipInfos infos={infos} />;
  };

  const renderInterpretation = (
    interpretation?: TooltipInterpretationOptions,
  ) => {
    return interpretation && <Interpretation {...interpretation} />;
  };

  const renderContent = () => {
    const option = getTooltipDefaultOptions(options);
    console.log('tooltip renderContent', option)
    const { operator, onlyMenu } = option;
    const { summaries, headInfo, details, interpretation, infos, tips, name } =
      data || {};
    const nameTip = { name, tips };

    if (onlyMenu) {
      return renderOperation(operator, true);
    }

    const DefaultContent = (
      <>
        {renderNameTips(nameTip)}
        {renderSummary(summaries)}
        {renderInterpretation(interpretation)}
        {renderHeadInfo(headInfo)}
        {renderDetail(details)}
        {renderInfos(infos)}
      </>
    );

    return (
      <>
        {renderOperation(operator)}
        {content ?? DefaultContent}
      </>
    );
  };

  return (<IntlProvider defaultLocale="zh-CN" locale={localeCode} messages={MESSAGES[localeCode] ?? {}}>
    {renderContent()}
  </IntlProvider>)

};
