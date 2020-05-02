import React from 'react';

interface BtnProps {
  className?: string;
  type?: 'primary' | 'true' | 'false' | 'unsure';
  small?: boolean;
  onClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}

export function BeliefBtn({
  className = '',
  type = 'primary',
  small = false,
  onClick,
  children
}: React.PropsWithChildren<BtnProps>): React.ReactElement {
  let typeClass;
  switch (type) {
  case 'primary':
    typeClass = 'blue';
    break;
  case 'true':
    typeClass = 'green';
    break;
  case 'false':
    typeClass = 'red';
    break;
  case 'unsure':
    typeClass = 'yellow';
    break;
  }

  const smallClass = small ? 'small' : '';
  const innerClassName = `customBtn ${typeClass} ${smallClass} ${className}`;
  return (
    <div
      className={innerClassName}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface StyledBtnProps {
  className?: string;
  small?: boolean;
  onClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}

export function TrueBeliefBtn({ 
  className = '', 
  small = false,
  onClick 
}: React.PropsWithChildren<StyledBtnProps>): React.ReactElement {
  return (
    <BeliefBtn
      small={small}
      type='true'
      className={className}
      onClick={onClick}
    >
      True
    </BeliefBtn>
  );
}

export function FalseBeliefBtn({ 
  className = '', 
  small = false,
  onClick 
}: React.PropsWithChildren<StyledBtnProps>): React.ReactElement {
  return (
    <BeliefBtn
      small={small}
      type='false'
      className={className}
      onClick={onClick}
    >
      False
    </BeliefBtn>
  );
}

export function UnsureBeliefBtn({ 
  className = '', 
  small = false,
  onClick 
}: React.PropsWithChildren<StyledBtnProps>): React.ReactElement {
  return (
    <BeliefBtn
      small={small}
      type='unsure'
      className={className}
      onClick={onClick}
    >
      Unsure
    </BeliefBtn>
  );
}