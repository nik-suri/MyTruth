import { Col, Row, Typography, Empty } from 'antd';
import React from 'react';
import { Display, BeliefStatus, SavedBelief, bkg } from '../util';
import '../css/Content.css';

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
        status: status,
        savedTime: new Date(),
        updatedTime: null
      }

      const newValue = currentValue.concat(newSavedBelief)

      chrome.storage.sync.set({ 'beliefs': newValue }, () => {
        bkg?.console.log('Value is set to ', newValue)
        switchDisplay(Display.SaveSuccess)
      })
    })
  }

  const selectionSection: JSX.Element = selection === '' ? (
    <Empty
      description={
        <span>
          Highlight some text and press ctrl+shift+s (cmd+shift+s if mac)!
        </span>
      }
    />
  ) : (
    <>
      <Row id='selectionRow'>
        <Text strong>{selection}</Text>
      </Row>
      <Row justify='space-around'>
        <Col>
          <div
            className='customBtn green'
            onClick={(e) => saveBelief(BeliefStatus.True)}
          >
            True
        </div>
        </Col>
        <Col>
          <div
            className='customBtn red'
            onClick={(e) => saveBelief(BeliefStatus.False)}
          >
            False
        </div>
        </Col>
        <Col>
          <div
            className='customBtn yellow'
            onClick={(e) => saveBelief(BeliefStatus.Unsure)}
          >
            Unsure
        </div>
        </Col>
      </Row>
    </>
  )

  return (
    <div className='contentWrapper'>
      {selectionSection}
      <div
        className='customBtn bluePop'
        id='seeBeliefsBtn'
        onClick={(e) => switchDisplay(Display.Beliefs)}
      >
        See my Beliefs
      </div>
    </div>
  )
}