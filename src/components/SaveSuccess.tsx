import React from 'react'
import { Button, Result } from 'antd'
import { Display } from '../util'

interface Props {
  setDisplay: (newDisplay: Display) => void;
}

export default function SaveSuccess({ setDisplay }: Props) {
  return (
    <Result
      status="success"
      title="Successfully saved your belief!"
      subTitle="Remember to hold yourself accountable."
      extra={[
        <Button type="link" onClick={(e) => setDisplay(Display.Beliefs)}>
          See my beliefs
        </Button>
      ]}
    />
  )
}