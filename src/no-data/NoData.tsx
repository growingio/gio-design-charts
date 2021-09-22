import React, { useEffect, useState, CSSProperties } from 'react';
export interface NoDataProps {
  filename: string;
  style: CSSProperties;
}

const NoData: React.FC<NoDataProps> = (props: NoDataProps) => {
  const { filename, style } = props;
  const [src, setSrc] = useState('');
  useEffect(() => {
    import(`../assets/svg/${filename}`).then((res) => {
      console.log(res);
      setSrc(res.default);
    });
  }, [filename]);
  return <>{src && <img src={src} style={style} />}</>;
};

export default NoData;
