import { Button, Divider, Tag } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import React from 'react';
import { TrueBeliefBtn, FalseBeliefBtn, UnsureBeliefBtn } from '../lib/BeliefBtns';
import HoverBtn from '../lib/HoverBtn';
import { accessCSSBeliefColor, getLatestBelief } from '../lib/util';

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

  let updatedTimeSpan: JSX.Element | null;
  if (belief.updates.length > 0) {
    const updatedTimeText = `Updated to current on ${(new Date(latestBelief.time)).toLocaleString()}`;
    updatedTimeSpan = (
      <span className='timeSpan'>
        <p className='timeText'>{updatedTimeText}</p>
        <Tag color={accessCSSBeliefColor(latestBelief.status)}>{latestBelief.status}</Tag>
      </span>
    );
  } else {
    updatedTimeSpan = null;
  }

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
        <div className='timeDisplay'>
          {updatedTimeSpan}
          <span className='timeSpan'>
            <p className='timeText'>{`Saved on ${(new Date(belief.savedAs.time)).toLocaleString()}`}</p>
            <Tag color={accessCSSBeliefColor(belief.savedAs.status)}>{belief.savedAs.status}</Tag>
          </span>
        </div>
        <Divider orientation='left'>
          History
        </Divider>
      </div>
    </div>
  );
}