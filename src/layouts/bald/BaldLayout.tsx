import React from 'react';
import core, { LayoutProps } from '../../core/core';

const BaldLayout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className="gio-d-chart" data-testid="bald-layout">
      {props.children}
    </div>
  );
};
export default core(BaldLayout);
