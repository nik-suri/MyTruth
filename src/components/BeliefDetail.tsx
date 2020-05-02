import { Divider } from 'antd';
import React from 'react';
import { Display, BeliefStatus, WrappedOptionalBelief } from '../lib/util';
import { TrueBeliefBtn, FalseBeliefBtn, UnsureBeliefBtn } from '../lib/BeliefBtns';

interface Props {
  wrappedOptionalBelief: WrappedOptionalBelief;
  updateBelief: (atIndex: number, newStatus: BeliefStatus, setDetailed?: boolean) => void;
  setDisplay: (newDisplay: Display) => void;
}

export default function BeliefDetail({
  wrappedOptionalBelief,
  updateBelief,
  setDisplay
}: Props): JSX.Element {
  if (wrappedOptionalBelief === null) {
    return <p>You should not be viewing this page with a null belief.</p>;
  }

  const [belief, index] = wrappedOptionalBelief;

  const trueSmallBtn = (
    <TrueBeliefBtn
      small
      className='beliefCardExtraBtn'
      onClick={(): void => updateBelief(index, BeliefStatus.True, true)}
    />
  );

  const falseSmallBtn = (
    <FalseBeliefBtn
      small
      className='beliefCardExtraBtn'
      onClick={(): void => updateBelief(index, BeliefStatus.False, true)}
    />
  );

  const unsureSmallBtn = (
    <UnsureBeliefBtn
      small
      className='beliefCardExtraBtn'
      onClick={(): void => updateBelief(index, BeliefStatus.Unsure, true)}
    />
  );

  let titleClassColor: string;
  let beliefBtns: JSX.Element[];
  switch (belief.status) {
  case BeliefStatus.True:
    titleClassColor = 'true';
    beliefBtns = [falseSmallBtn, unsureSmallBtn];
    break;
  case BeliefStatus.False:
    titleClassColor = 'false';
    beliefBtns = [trueSmallBtn, unsureSmallBtn];
    break;
  case BeliefStatus.Unsure:
    titleClassColor = 'unsure';
    beliefBtns = [trueSmallBtn, falseSmallBtn];
    break;
  }

  return (
    <div className='beliefDetailContainer'>
      <div className={`headerContainer ${titleClassColor}`}>
        <div className='header'>
          <p className='text'>{belief.status}</p>
          <div className='buttons'>
            {beliefBtns}
          </div>
        </div>
      </div>
      <div className='body'>
        <p>{belief.belief}</p>
        <Divider />
      </div>
    </div>
  );
}