import React, { useRef, useCallback } from 'react';
import core, { LayoutProps } from '../../core/core';
import useOffset from '../../hooks/useOffset';

const BaldLayout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const {
    options: { chart },
  } = props;
  const baldRef = useRef<HTMLDivElement | null>(null);
  const watchReset = useCallback(() => {
    chart?.forceFit();
  }, [chart]);
  useOffset(baldRef, watchReset);
  return (
    <div className="gio-d-charts" ref={baldRef} data-testid="bald-layout">
      {props.children}
    </div>
  );
};
export default core(BaldLayout);
