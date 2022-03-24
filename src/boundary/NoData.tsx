import React from 'react';
import NoDataBigSvg from '../assets/svg/NoDataSvg';
import './style/NoData.less';

export interface NoDataProps {
  height?: number;
}

const NoData = (props: NoDataProps) => {
  const { height = 300 } = props;
  return (
    <div className="gio-d-charts-no-data" data-testid="no-data" style={{ height }}>
      <div className="inside">
        <NoDataBigSvg width="300px" height="200px" />
      </div>
    </div>
  );
};

export default NoData;
