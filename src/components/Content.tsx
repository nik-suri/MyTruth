import { Button, Col, Row, Typography } from 'antd';
import * as React from 'react';
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
          <Button
            type='primary'
            onClick={(e) => saveBelief(BeliefStatus.True)}
          >
            True
          </Button>
        </Col>
        <Col>
          <Button 
            type='danger'
            onClick={(e) => saveBelief(BeliefStatus.False)}
          >
            False
          </Button>
        </Col>
        <Col>
          <Button 
            type='primary'
            onClick={(e) => saveBelief(BeliefStatus.Unsure)}
          >
            Unsure
          </Button>
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