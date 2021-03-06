import React, { useEffect, useState } from 'react';
import { formatNumber } from '../../utils/formatNumber';
import './style/drag.less';

export interface VerticalContentProps {
  sizeAcceptor: any;
  title?: string;
  total?: number;
  color?: string;
}

const VerticalContent = React.memo((props: VerticalContentProps) => {
  const { sizeAcceptor, title, total, color } = props;
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(120);

  useEffect(() => {
    sizeAcceptor(({ height: chartHeight, width: contentWidth }: { height: number; width: number }) => {
      chartHeight && setHeight(chartHeight);
      contentWidth && setWidth(contentWidth);
    });
  }, [sizeAcceptor]);
  return (
    <div data-testid="vertical-content" className="vertical-content" style={{ height: height - 42, width: width - 30 }}>
      <div className="vertical-content-title" style={{ color }}>
        {title}
      </div>
      <div className="vertical-content-total" style={{ color }}>
        {formatNumber(Number(total)) || ''}
      </div>
    </div>
  );
});

export default VerticalContent;
