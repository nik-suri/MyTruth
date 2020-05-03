import { Card } from 'antd';
import React from 'react';
import { BeliefBtn, TrueBeliefBtn, FalseBeliefBtn, UnsureBeliefBtn } from '../lib/BeliefBtns';
import { getLatestBelief } from '../lib/util';

interface ExtraContentProps {
  innerElements: JSX.Element[];
}

function BeliefItemExtraContent({ innerElements }: ExtraContentProps): JSX.Element {
  return <div className='beliefCardExtraContent'>{innerElements}</div>;
}

interface Props {
  belief: SavedBelief;
  index: number;
  staleItem?: boolean;
  updateBelief: (atIndex: number, newStatus: BeliefStatus) => void;
  setDetailedBelief: (detailedBelief: WrappedOptionalBelief) => void;
  setDisplay: (newDisplay: Display) => void;
}

export default function BeliefItem({
  belief,
  index,
  staleItem = false,
  updateBelief,
  setDetailedBelief,
  setDisplay
}: Props): JSX.Element {

  const latestBelief = getLatestBelief(belief);

  function handleBeliefBtnClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>, 
    status: BeliefStatus
  ): void {
    e.stopPropagation();
    updateBelief(index, status);
  }

  function switchToDetailedBelief(): void {
    const wrappedOptionalBelief: WrappedOptionalBelief = [belief, index];

    setDetailedBelief(wrappedOptionalBelief);
    setDisplay(Display.BeliefDetail);
  }
  
  const staleBeliefBtn: JSX.Element | null = !staleItem ? null : (
    <BeliefBtn
      className='staleBeliefBtn'
      onClick={(e): void => handleBeliefBtnClick(e, latestBelief.status)}
    >
      Keep this belief
    </BeliefBtn>
  );

  const trueSmallBtn = (
    <TrueBeliefBtn
      small
      className='beliefCardExtraBtn'
      onClick={(e): void => handleBeliefBtnClick(e, BeliefStatus.True)}
    />
  );

  const falseSmallBtn = (
    <FalseBeliefBtn
      small
      className='beliefCardExtraBtn'
      onClick={(e): void => handleBeliefBtnClick(e, BeliefStatus.False)}
    />
  );

  const unsureSmallBtn = (
    <UnsureBeliefBtn
      small
      className='beliefCardExtraBtn'
      onClick={(e): void => handleBeliefBtnClick(e, BeliefStatus.Unsure)}
    />
  );

  let titleClass = 'beliefCardHeaderContent';
  let extraContent: JSX.Element;
  switch (latestBelief.status) {
  case BeliefStatus.True:
    titleClass += ' trueTitle';
    extraContent = (
      <BeliefItemExtraContent
        innerElements={[falseSmallBtn, unsureSmallBtn]}
      />
    );
    break;
  case BeliefStatus.False:
    titleClass += ' falseTitle';
    extraContent = (
      <BeliefItemExtraContent
        innerElements={[trueSmallBtn, unsureSmallBtn]}
      />
    );
    break;
  case BeliefStatus.Unsure:
    titleClass += ' unsureTitle';
    extraContent = (
      <BeliefItemExtraContent
        innerElements={[trueSmallBtn, falseSmallBtn]}
      />
    );
    break;
  }

  // show proper saved/updated time
  const updateDate = new Date(latestBelief.time);
  let timeDisplay: string;
  if (belief.updates.length > 0) {
    timeDisplay = `Updated ${updateDate.toLocaleString()}`;
  } else {
    timeDisplay = `Saved ${updateDate.toLocaleString()}`;
  }

  const titleEl = (
    <>
      <div className='beliefCardHeaderContainer'>
        <p className={titleClass}>{latestBelief.status}</p>
        {staleBeliefBtn}
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
  );

  return (
    <Card
      className='beliefCard'
      hoverable
      size='small'
      title={titleEl}
      extra={extraContent}
      onClick={(): void => switchToDetailedBelief()}
    >
      <p>{belief.belief}</p>
    </Card>
  );
}