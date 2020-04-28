import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { Display, BeliefStatus, bkg } from '../util';

const { Text } = Typography;

interface Props {
  selection: string;
  switchDisplay: (newDisplay: Display) => void;
}

export default function Content({ selection, switchDisplay }: Props) {
  function saveBelief(status: string): void {
    chrome.storage.sync.get(status, data => {
      const currentValue: string[] = data[status]
      const newValue = currentValue.concat(selection)

      chrome.storage.sync.set({ [status]: newValue }, () => {
        bkg?.console.log('Value is set to ', newValue)
        switchDisplay(Display.SaveSuccess)
      })
    })
  }

  const selectionSection: JSX.Element | null = selection === '' ? null : (
    <>
      <Row>
        <Text strong>{selection}</Text>
      </Row>
      <Row justify='space-around'>
        <Col>
          <div
            className='themelabBtn'
            onClick={(e) => saveBelief(BeliefStatus.True)}
          >
            True
          </div>
        </Col>
        <Col>
          <div 
            className='themelabBtn'
            onClick={(e) => saveBelief(BeliefStatus.False)}
          >
            False
          </div>
        </Col>
        <Col>
          <div 
            className='themelabBtn'
            onClick={(e) => saveBelief(BeliefStatus.Unsure)}
          >
            Unsure
          </div>
        </Col>
      </Row>
    </>
  )

  return (
    <div>
      {selectionSection}
      <Button
        type="link"
        onClick={(e) => switchDisplay(Display.Beliefs)}
      >
        Click here to see your beliefs
      </Button>
    </div>
  )
}