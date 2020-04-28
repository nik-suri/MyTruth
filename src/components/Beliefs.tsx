import { Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { BeliefStatus, SavedBelief, bkg, Display } from '../util';
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

  const beliefElements: JSX.Element[] = beliefs.map((belief, i) => {
    let titleClass
    switch (belief.status as BeliefStatus) {
      case BeliefStatus.True:
        titleClass = 'trueTitle'
        break
      case BeliefStatus.False:
        titleClass = 'falseTitle'
        break
      case BeliefStatus.Unsure:
        titleClass = 'unsureTitle'
        break
    }

    const titleEl = <p className={titleClass}>{belief.status}</p>

    return (
      <Card
        className='beliefCard'
        hoverable
        size='small'
        title={titleEl}
        key={i}
      >
        <p>{belief.belief}</p>
      </Card>
    )
  })

  return (
    <div className='beliefDisplay'>
      <div
        className='backBtn'
        onClick={(e) => switchDisplay(Display.Main)}
      >
        <ArrowLeftOutlined />
      </div>
      {beliefElements}
    </div>
  )
}