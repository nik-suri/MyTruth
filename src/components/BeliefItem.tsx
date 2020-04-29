import { Card } from 'antd';
import React from 'react';
import '../css/BeliefItem.css';
import { BeliefStatus, SavedBelief } from '../util';

interface ExtraContentProps {
  innerElements: JSX.Element[]
}

function BeliefItemExtraContent({ innerElements }: ExtraContentProps) {
  return <div className='beliefCardExtraContent'>{innerElements}</div>
}

interface Props {
  belief: SavedBelief;
  index: number;
}

export default function BeliefItem({ belief, index }: Props) {
  const trueSmallBtn = (
    <div
      className='customBtn green small beliefCardExtraBtn'
    >
      True
    </div>
  )
  const falseSmallBtn = <div className='customBtn red small beliefCardExtraBtn'>False</div>
  const unsureSmallBtn = <div className='customBtn yellow small beliefCardExtraBtn'>Unsure</div>

  let titleClass: string
  let extraContent: JSX.Element
  switch (belief.status as BeliefStatus) {
    case BeliefStatus.True:
      titleClass = 'trueTitle'
      extraContent = (
        <BeliefItemExtraContent
          innerElements={[falseSmallBtn, unsureSmallBtn]}
        />
      )
      break
    case BeliefStatus.False:
      titleClass = 'falseTitle'
      extraContent = (
        <BeliefItemExtraContent
          innerElements={[trueSmallBtn, unsureSmallBtn]}
        />
      )
      break
    case BeliefStatus.Unsure:
      titleClass = 'unsureTitle'
      extraContent = (
        <BeliefItemExtraContent
          innerElements={[trueSmallBtn, falseSmallBtn]}
        />
      )
      break
  }

  const titleEl = <p className={titleClass}>{belief.status}</p>

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