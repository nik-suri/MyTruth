import { RightOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import React, { useEffect, useState } from 'react';
import Beliefs from './components/Beliefs';
import Content from './components/Content';
import SaveSuccess from './components/SaveSuccess';
import StaleBeliefs from './components/StaleBeliefs';
import './css/Popup.css';
import { BeliefStatus, bkg, Display, SavedBelief, WrappedStaleBelief } from './util';

export default function Popup() {
  const [isLoading, setIsLoading] = useState(true)
  const [display, setDisplay] = useState<Display>(Display.Main)
  const [selection, setSelection] = useState('')
  const [beliefs, setBeliefs] = useState<SavedBelief[]>([])

  useEffect(() => {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString().trim();'
    }, selectionArr => {
      bkg?.console.log(selectionArr)
      setSelection(selectionArr[0])
      setIsLoading(false)
    })

    chrome.storage.sync.get('beliefs', data => {
      const savedBeliefs: SavedBelief[] = data.beliefs
      setBeliefs(savedBeliefs)
    })
  }, [])

  function updateBelief(atIndex: number, newStatus: BeliefStatus): void {
    const newBeliefs = cloneDeep(beliefs)
    const updatingBelief = newBeliefs[atIndex]
    updatingBelief.status = newStatus
    updatingBelief.updatedTime = Date.now()

    chrome.storage.sync.set({ 'beliefs': newBeliefs }, () => {
      bkg?.console.log('Updated beliefs in storage.')
    })
    setBeliefs(newBeliefs)
  }

  function calculateStaleBeliefs(): WrappedStaleBelief[] {
    const currentTime = Date.now()
    const staleTimeDiff = 1814400000 // milliseconds representing 3 weeks
    return beliefs.reduce((acc: WrappedStaleBelief[], belief, index) => {
      const wrappedStaleBelief: WrappedStaleBelief = {
        savedBelief: belief,
        savedIndex: index
      }

      const beliefTimeRef = belief.updatedTime ?? belief.savedTime
      if (currentTime - beliefTimeRef >= staleTimeDiff) {
        return acc.concat(wrappedStaleBelief)
      }
      return acc
    }, [])
  }

  const staleBeliefs = calculateStaleBeliefs()

  const staleBeliefsNotif: JSX.Element | null = staleBeliefs.length === 0
    ? null
    : (
      <div
        className='notifBanner'
        onClick={(e) => setDisplay(Display.StaleBeliefs)}
      >
        <p id='notifBannerText'>Old beliefs - Update them now!</p>
        <Badge
          className='notifBannerBadge'
          count={staleBeliefs.length}
          overflowCount={20}
        />
        <RightOutlined id='notifBannerArrow' />
      </div>
    )

  let displayContent: JSX.Element
  switch (display as Display) {
    case Display.Main:
      displayContent = (
        <>
          {staleBeliefsNotif}
          <Content
            selection={selection}
            setBeliefs={setBeliefs}
            setDisplay={setDisplay}
          />
        </>
      )
      break
    case Display.SaveSuccess:
      displayContent = (
        <>
          {staleBeliefsNotif}
          <SaveSuccess setDisplay={setDisplay} />
        </>
      )
      break
    case Display.Beliefs:
      displayContent = (
        <>
          {staleBeliefsNotif}
          <Beliefs
            beliefs={beliefs}
            updateBelief={updateBelief}
            setDisplay={setDisplay}
          />
        </>
      )
      break
    case Display.StaleBeliefs:
      displayContent = (
        <StaleBeliefs
          staleBeliefs={staleBeliefs}
          updateBelief={updateBelief}
          setDisplay={setDisplay}
        />
      )
      break
  }

  return isLoading ? <></> : displayContent
}