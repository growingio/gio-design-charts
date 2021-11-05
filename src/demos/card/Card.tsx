import React from 'react';

interface CardProps {
  children: JSX.Element | JSX.Element[];
}

const Card = (props: CardProps) => {
  const { children } = props;
  return (
    <div
      style={{
        border: '1px solid #EBEDF5',
        boxSizing: 'border-box',
        borderRadius: '4px',
        padding: 19,
        margin: 8,
        // height: 350,
        display: 'block',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

export default Card;
