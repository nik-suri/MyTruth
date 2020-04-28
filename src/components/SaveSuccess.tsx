import React from 'react'
import { Result } from 'antd'

export default function SaveSuccess() {
  return (
    <Result
      status="success"
      title="Successfully saved your belief!"
      subTitle="Remember to hold yourself accountable."
    />
  )
}