import { PageHeader } from 'antd';
import React from 'react';
import '../css/Beliefs.css';
import { BeliefStatus, Display, SavedBelief } from '../util';
import BeliefItem from './BeliefItem';

interface Props {
  beliefs: SavedBelief[];
  updateBelief: (atIndex: number, newStatus: BeliefStatus) => void;
  setDisplay: (newDisplay: Display) => void;
}

export default function Beliefs({ beliefs, updateBelief, setDisplay }: Props): JSX.Element {

  const beliefElements: JSX.Element[] = beliefs.map((belief, i) => (
    <BeliefItem
      belief={belief}
      index={i}
      updateBelief={updateBelief}
      key={i} 
    />
  ));

  return (
    <div className='beliefDisplay'>
      <PageHeader
        className='beliefsHeader'
        title='My Beliefs'
        onBack={(): void => setDisplay(Display.Main)}
      />
      {beliefElements}
    </div>
  );
}