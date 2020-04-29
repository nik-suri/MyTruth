import { Card } from 'antd';
import React from 'react';
import '../css/BeliefItem.css';
import { BeliefStatus, SavedBelief, bkg } from '../util';

interface ExtraContentProps {
  innerElements: JSX.Element[]
}

function BeliefItemExtraContent({ innerElements }: ExtraContentProps) {
  return <div className='beliefCardExtraContent'>{innerElements}</div>
}

interface Props {
  belief: SavedBelief;
  index: number;
  updateBelief: (atIndex: number, newStatus: BeliefStatus) => void
}

export default function BeliefItem({ belief, index, updateBelief }: Props) {
  const trueSmallBtn = (
    <div
      className='customBtn green small beliefCardExtraBtn'
      onClick={(e) => updateBelief(index, BeliefStatus.True)}
    >
      True
    </div>
  )

  const falseSmallBtn = (
    <div
      className='customBtn red small beliefCardExtraBtn'
      onClick={(e) => updateBelief(index, BeliefStatus.False)}
    >
      False
    </div>
  )

  const unsureSmallBtn = (
    <div
      className='customBtn yellow small beliefCardExtraBtn'
      onClick={(e) => updateBelief(index, BeliefStatus.Unsure)}
    >
      Unsure
    </div>
  )

  let titleClass = 'beliefCardHeaderContent'
  let extraContent: JSX.Element
  switch (belief.status as BeliefStatus) {
    case BeliefStatus.True:
      titleClass += ' trueTitle'
      extraContent = (
        <BeliefItemExtraContent
          innerElements={[falseSmallBtn, unsureSmallBtn]}
        />
      )
      break
    case BeliefStatus.False:
      titleClass += ' falseTitle'
      extraContent = (
        <BeliefItemExtraContent
          innerElements={[trueSmallBtn, unsureSmallBtn]}
        />
      )
      break
    case BeliefStatus.Unsure:
      titleClass += ' unsureTitle'
      extraContent = (
        <BeliefItemExtraContent
          innerElements={[trueSmallBtn, falseSmallBtn]}
        />
      )
      break
  }

  // show proper saved/updated time
  let timeDisplay: string;
  if (belief.updatedTime !== null) {
    const updatedTimeDate = new Date(belief.updatedTime)
    timeDisplay = `Updated ${updatedTimeDate.toLocaleString()}`
  } else {
    const savedTimeDate = new Date(belief.savedTime)
    timeDisplay = `Saved ${savedTimeDate.toLocaleString()}`
  }

  const titleEl = (
    <>
      <div>
        <p className={titleClass}>{belief.status}</p>
      </div>
      <div>
        <p 
          className='beliefCardHeaderContent' 
          id='beliefCardHeaderTimeDisplay'
        >
          {timeDisplay}
        </p>
      </div>
    </>
  )

  return (
    <Card
      className='beliefCard'
      hoverable
      size='small'
      title={titleEl}
      extra={extraContent}
    >
      <p>{belief.belief}</p>
    </Card>
  )
}