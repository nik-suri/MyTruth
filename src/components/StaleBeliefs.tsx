import { PageHeader } from 'antd';
import React from 'react';
import '../css/Beliefs.css';
import { BeliefStatus, Display, WrappedStaleBelief } from '../util';
import BeliefItem from './BeliefItem';

interface Props {
  staleBeliefs: WrappedStaleBelief[];
  updateBelief: (atIndex: number, newStatus: BeliefStatus) => void;
  setDisplay: (newDisplay: Display) => void;
}

export default function StaleBeliefs({ staleBeliefs, updateBelief, setDisplay }: Props): JSX.Element {
  const beliefElements: JSX.Element[] = staleBeliefs.map((wrappedStaleBelief, i) => (
    <BeliefItem
      staleItem
      belief={wrappedStaleBelief.savedBelief}
      index={wrappedStaleBelief.savedIndex}
      updateBelief={updateBelief}
      key={i}
    />
  ));

  return (
    <div className='beliefDisplay'>
      <PageHeader
        className='beliefsHeader'
        title='My Old Beliefs'
        onBack={(): void => setDisplay(Display.Main)}
      />
      {beliefElements}
    </div>
  );
}