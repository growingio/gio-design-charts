import { toLower } from 'lodash';
import React from 'react';
import NoData from './NoData';

import './style/NoData.less';

export interface NoResultProps {
  size?: string;
}

const NoResult: React.FC<NoResultProps> = (props: NoResultProps) => {
  const { size } = props;
  const isSmall = toLower(size) === 'small';
  return (
    <div className="no-data">
      <NoData filename={'NoResult'} style={{ width: isSmall ? 150 : 300, height: isSmall ? 100 : 200 }} />
    </div>
  );
};

export default NoResult;
