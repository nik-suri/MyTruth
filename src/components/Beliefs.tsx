import { PageHeader } from 'antd';
import React, { useState, useEffect } from 'react';
import { SavedBelief, bkg, Display, BeliefStatus } from '../util';
import BeliefItem from './BeliefItem';
import '../css/Beliefs.css';
import cloneDeep from 'lodash/cloneDeep'

interface Props {
  switchDisplay: (newDisplay: Display) => void;
}

export default function Beliefs({ switchDisplay }: Props) {
  const [beliefs, setBeliefs] = useState<SavedBelief[]>([])

  useEffect(() => {
    chrome.storage.sync.get('beliefs', data => {
      bkg?.console.log(data)
      setBeliefs(data.beliefs)
    })
  }, [])

  function updateBelief(atIndex: number, newStatus: BeliefStatus): void {
    const newBeliefs = cloneDeep(beliefs)
    newBeliefs[atIndex].status = newStatus
    setBeliefs(newBeliefs)
  }

  const beliefElements: JSX.Element[] = beliefs.map((belief, i) => (
    <BeliefItem
      belief={belief}
      index={i}
      updateBelief={updateBelief}
      key={i} 
    />
  ))

  return (
    <div className='beliefDisplay'>
      <PageHeader
        className='beliefsHeader'
        title='My Beliefs'
        onBack={() => switchDisplay(Display.Main)}
      />
      {beliefElements}
    </div>
  )
}