import React from 'react';
import { Button, Result } from 'antd';
import { Display } from '../util';

interface Props {
  setDisplay: (newDisplay: Display) => void;
}

export default function SaveSuccess({ setDisplay }: Props): JSX.Element {
  return (
    <Result
      status="success"
      title="Successfully saved your belief!"
      subTitle="Remember to hold yourself accountable."
      extra={[
        <Button 
          type="link" 
          onClick={(): void => setDisplay(Display.Beliefs)}
          key='extraBtn'
        >
          See my beliefs
        </Button>
      ]}
    />
  );
}