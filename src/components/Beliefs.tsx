import { PageHeader } from 'antd';
import React, { useState, useEffect } from 'react';
import { SavedBelief, bkg, Display } from '../util';
import BeliefItem from './BeliefItem';
import '../css/Beliefs.css'

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


  const beliefElements: JSX.Element[] = beliefs.map((belief, i) => (
    <BeliefItem belief={belief} index={i} key={i} />
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