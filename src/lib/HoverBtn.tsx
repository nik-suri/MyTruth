import React from 'react';

interface Props {
  type?: 'rect' | 'circle';
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
  className?: string;
}

export default function HoverBtn({
  type = 'rect',
  onClick,
  className = '',
  children
}: React.PropsWithChildren<Props>): React.ReactElement {

  let hoverClass;
  switch (type) {
  case 'rect':
    hoverClass = 'hoverRectWrapper';
    break;
  case 'circle':
    hoverClass = 'hoverCircleWrapper';
    break;
  }

  const innerClass = `hoverBtnWrapper ${hoverClass} ${className}`;

  return (
    <div
      className={innerClass}
      onClick={onClick}
    >
      <div className='hoverBtnBack' />
      {children}
    </div>
  );
}