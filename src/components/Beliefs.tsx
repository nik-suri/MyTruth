import { LeftOutlined } from '@ant-design/icons';
import { Result } from 'antd';
import React from 'react';
import BeliefItem from './BeliefItem';

interface Props {
  stale?: boolean;
  beliefs: SavedBelief[] | WrappedStaleBelief[];
  updateBelief: (atIndex: number, newStatus: BeliefStatus) => void;
  setDetailedBelief: (detailedBelief: WrappedOptionalBelief) => void;
  setDetailBeliefFromView: (fromDisplay: Display) => void;
  setDisplay: (newDisplay: Display) => void;
}

export default function Beliefs({
  stale = false,
  beliefs,
  updateBelief,
  setDetailedBelief,
  setDetailBeliefFromView,
  setDisplay
}: Props): JSX.Element {

  let title: string;
  let emptyStatus: 403 | 404 | 500 | '403' | '404' | '500' | 'success' | 'error' | 'info' | 'warning' | undefined;
  let emptyTitle: string;
  let emptySubtitle: string;
  if (stale) {
    title = 'My Old Beliefs';
    emptyStatus = 'success';
    emptyTitle = 'You\'re all set!';
    emptySubtitle = 'You have no old beliefs. You\'re an epistemic pro!';
  } else {
    title = 'My Beliefs';
    emptyStatus = 'info';
    emptyTitle = 'You have no beliefs!';
    emptySubtitle = 'Add a belief by highlighting text in your browser and pressing ctrl+shift+s (cmd+shift+s if mac)!';
  }

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

      {beliefElements.length > 0 ? beliefElements : (
        <Result
          status={emptyStatus}
          title={emptyTitle}
          subTitle={emptySubtitle}
        />
      )}
    </div>
  );
}
