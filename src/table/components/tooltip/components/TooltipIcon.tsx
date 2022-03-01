import React from 'react';
import { getIcon } from '@antv/s2';
import { TOOLTIP_DEFAULT_ICON_PROPS } from '../constants';
import { HtmlIcon, ReactElement } from '../../icons';

export interface IconProps {
  icon?: Element | string;
  [key: string]: unknown;
};
export const Icon = (props: IconProps) => {
  const { icon, ...attrs } = props;

  if (!icon) {
    return null;
  }

  if (getIcon(icon as string)) {
    const name = icon as string;

    return <HtmlIcon name={name} {...TOOLTIP_DEFAULT_ICON_PROPS} {...attrs} />;
  }
  return (
    <ReactElement content={icon} {...TOOLTIP_DEFAULT_ICON_PROPS} {...attrs} />
  );
};
