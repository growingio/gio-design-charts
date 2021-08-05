import React, { CSSProperties } from 'react';

const leftStyles: CSSProperties = {
  width: '50%',
  float: 'left',
};

const rightStyles: CSSProperties = {
  width: '50%',
  float: 'right',
};

const titleStyles: CSSProperties = {
  fontSize: '14px',
  fontFamily: ` "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;`,
  textAlign: 'center',
  color: 'rgb(30, 167, 253)',
};

const Frame = (props: any) => {
  const { children, type, title, path } = props;
  return (
    <div style={type === 'right' ? rightStyles : leftStyles}>
      {children}
      <div style={titleStyles}>
        <a style={titleStyles} href={path}>
          {title}
        </a>
      </div>
    </div>
  );
};

export default Frame;
