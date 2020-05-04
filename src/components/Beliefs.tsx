import { LeftOutlined } from '@ant-design/icons';
import React from 'react';
import BeliefItem from './BeliefItem';

interface Props {
  title: string;
  beliefs: SavedBelief[] | WrappedStaleBelief[];
  updateBelief: (atIndex: number, newStatus: BeliefStatus) => void;
  setDetailedBelief: (detailedBelief: WrappedOptionalBelief) => void;
  setDetailBeliefFromView: (fromDisplay: Display) => void;
  setDisplay: (newDisplay: Display) => void;
}

export default function Beliefs({
  title,
  beliefs,
  updateBelief,
  setDetailedBelief,
  setDetailBeliefFromView,
  setDisplay
}: Props): JSX.Element {

  let beliefElements: JSX.Element[];
  if (beliefs.length === 0) {
    beliefElements = [];
  } else if ('savedBelief' in beliefs[0]) {
    beliefElements = (beliefs as WrappedStaleBelief[]).map((wrappedStaleBelief, i) => (
      <BeliefItem
        staleItem
        belief={wrappedStaleBelief.savedBelief}
        index={wrappedStaleBelief.savedIndex}
        updateBelief={updateBelief}
        setDetailedBelief={setDetailedBelief}
        setDetailBeliefFromView={setDetailBeliefFromView}
        setDisplay={setDisplay}
        key={i}
      />
    ));
  } else {
    beliefElements = (beliefs as SavedBelief[]).map((belief, i) => (
      <BeliefItem
        belief={belief}
        index={i}
        updateBelief={updateBelief}
        setDetailedBelief={setDetailedBelief}
        setDetailBeliefFromView={setDetailBeliefFromView}
        setDisplay={setDisplay}
        key={i}
      />
    ));
  }

  return (
    <div className='beliefDisplay'>
      
      <div className='header'>

        <div className='left'>
          <LeftOutlined
            className='backBtn'
            onClick={(): void => setDisplay(Display.Main)}
          />
          <p className='text'>{title}</p>
        </div>

        <div className='right'>
          {/* put filtering in here */}
        </div>

      </div>

      {beliefElements}
    </div>
  );
}
