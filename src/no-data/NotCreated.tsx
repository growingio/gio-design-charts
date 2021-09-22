import { toLower } from 'lodash';
import React from 'react';
import NoData from './NoData';

import './style/NoData.less';

export interface NotCreatedProps {
  size?: string;
  description?: string;
  button?: React.ReactElement;
}

const NotCreated: React.FC<NotCreatedProps> = (props: NotCreatedProps) => {
  const { button, description, size } = props;
  const isSmall = toLower(size) === 'small';
  return (
    <div className="no-data">
      <NoData
        filename={isSmall ? 'NotCreated' : 'NotCreatedDashboard'}
        style={{ width: isSmall ? 150 : 300, height: isSmall ? 100 : 200 }}
      />
      <div className="no-data-desc">{description}</div>
      <div className="no-data-btn">{button}</div>
    </div>
  );
};

export default NotCreated;
