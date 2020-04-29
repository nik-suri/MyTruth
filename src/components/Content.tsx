import { Badge, Col, Row, Typography, Empty } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Display, BeliefStatus, SavedBelief, bkg } from '../util';
import '../css/Content.css';

const { Text } = Typography;

interface Props {
  selection: string;
  switchDisplay: (newDisplay: Display) => void;
}

export default function Content({ selection, switchDisplay }: Props) {
  const [staleBeliefs, setStaleBeliefs] = useState<SavedBelief[]>([])

  useEffect(() => {
    chrome.storage.sync.get('beliefs', data => {
      const savedBeliefs: SavedBelief[] = data.beliefs
      const currentTime = Date.now()
      const staleTimeDiff = 1814400000 // milliseconds representing 3 weeks
      const newStaleBeliefs = savedBeliefs.reduce((acc: SavedBelief[], belief) => {
        const beliefTimeRef = belief.updatedTime ?? belief.savedTime
        if (currentTime - beliefTimeRef >= staleTimeDiff) {
          return acc.concat(belief)
        }
        return acc
      }, [])

      setStaleBeliefs(newStaleBeliefs)
    })
  }, [])

  function saveBelief(status: BeliefStatus): void {
    chrome.storage.sync.get('beliefs', data => {
      const currentValue: SavedBelief[] = data.beliefs

      // const saveTime = Date.now()
      const saveTime = Date.now() - 1814400000 // for testing

      const newSavedBelief: SavedBelief = {
        belief: selection,
        status: status,
        savedTime: saveTime,
        updatedTime: null
      }

      const newValue = currentValue.concat(newSavedBelief)

      chrome.storage.sync.set({ 'beliefs': newValue }, () => {
        bkg?.console.log('Value is set to ', newValue)
        switchDisplay(Display.SaveSuccess)
      })
    })
  }

  const selectionSection: JSX.Element = selection === ''
    ? (
      <Empty
        description={
          <span>
            Highlight some text and press ctrl+shift+s (cmd+shift+s if mac)!
        </span>
        }
      />
    )
    : (
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

  const staleBeliefsNotif: JSX.Element | null = staleBeliefs.length === 0
    ? null
    : (
      <div
        className='contentHeader'
        onClick={(e) => bkg?.console.log('click')}
      >
        <p id='contentHeaderText'>Old beliefs - Update them now!</p>
        <Badge
          className='contentHeaderBadge'
          count={staleBeliefs.length}
          overflowCount={20}
        />
        <RightOutlined id='contentHeaderArrow' />
      </div>
    )

  return (
    <>
      {staleBeliefsNotif}
      <div className='contentWrapper'>
        {selectionSection}
        <div
          className='customBtn bluePop contentNavBtn'
          onClick={(e) => switchDisplay(Display.Beliefs)}
        >
          See my Beliefs
      </div>
      </div>
    </>
  )
}