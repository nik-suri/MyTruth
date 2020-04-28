import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { Display, BeliefStatus, SavedBelief, bkg } from '../util';

const { Text } = Typography;

interface Props {
  selection: string;
  switchDisplay: (newDisplay: Display) => void;
}

export default function Content({ selection, switchDisplay }: Props) {

  function saveBelief(status: BeliefStatus): void {
    chrome.storage.sync.get('beliefs', data => {
      const currentValue: SavedBelief[] = data.beliefs

      const newSavedBelief: SavedBelief = {
        belief: selection,
        status: status
      }

      const newValue = currentValue.concat(newSavedBelief)

      chrome.storage.sync.set({ 'beliefs': newValue }, () => {
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