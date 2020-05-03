import { Button, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import React from 'react';
import { TrueBeliefBtn, FalseBeliefBtn, UnsureBeliefBtn } from '../lib/BeliefBtns';
import HoverBtn from '../lib/HoverBtn';
import { bkg, getLatestBelief } from '../lib/util';

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
  const latestBelief = getLatestBelief(belief);

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
  switch (latestBelief.status) {
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

  bkg?.console.log(belief.updates);

  return (
    <div className='beliefDetailContainer'>
      <div className={`headerContainer ${titleClassColor}`}>
        <div className='header'>
          <LeftOutlined
            className='backBtn'
            onClick={(): void => setDisplay(Display.Beliefs)}
          />
          <p className='text'>{latestBelief.status}</p>
          <div className='buttons'>
            {beliefBtns}
          </div>
        </div>
      </div>
      <div className='body'>
        <p>{belief.belief}</p>
        <Divider style={{ marginBottom: '10px' }} />
        <div className='sourceLinks'>
          <div style={{ display: 'flex' }}>
            <p style={{ margin: 'auto' }}>Source:</p> 
            <Button 
              type='link'
              onClick={(): void => chrome.tabs.create({ url: belief.url })}
            >
              {belief.urlDomain}
            </Button>
          </div>
          <HoverBtn
            onClick={(): void => chrome.tabs.create({ url: belief.url })}
          >
            <Button type='link'>
              Link to Article
            </Button>
          </HoverBtn>
        </div>
      </div>
    </div>
  );
}