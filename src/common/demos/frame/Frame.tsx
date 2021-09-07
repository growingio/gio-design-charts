import React, { CSSProperties } from 'react';

const leftStyles: CSSProperties = {
  width: '50%',
  float: 'left',
  overflowX: 'auto',
};

const rightStyles: CSSProperties = {
  width: '50%',
  float: 'right',
  overflowX: 'auto',
};

const titleStyles: CSSProperties = {
  fontSize: '14px',
  fontFamily:
    ' "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;',
  textAlign: 'center',
  color: 'rgb(30, 167, 253)',
};

const Frame = (props: any) => {
  const { children, type, title, path, styles = {} } = props;
  return (
    <div style={type === 'right' ? rightStyles : leftStyles}>
      <div style={styles}>{children}</div>
      <div style={titleStyles}>
        <a style={titleStyles} href={path}>
          {title}
        </a>
      </div>
    </div>
  );
};

export default Frame;
