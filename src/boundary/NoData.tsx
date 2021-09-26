import React from 'react';
import NoDataBigSvg from '../assets/svg/NoDataSvg';
import './style/NoData.less';

const NoData = () => {
  return (
    <div className="gio-d-charts-no-data" data-testid="no-data">
      <div className="inside">
        <NoDataBigSvg width="300px" height="200px" />
      </div>
    </div>
  );
};

export default NoData;
