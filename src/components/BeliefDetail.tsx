import { Button, Divider, Popconfirm, Tag, Timeline } from 'antd';
import { DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import React from 'react';
import { BeliefBtn, TrueBeliefBtn, FalseBeliefBtn, UnsureBeliefBtn } from '../lib/BeliefBtns';
import HoverBtn from '../lib/HoverBtn';
import { accessCSSBeliefColor, getLatestBelief } from '../lib/util';

interface Props {
  wrappedOptionalBelief: WrappedOptionalBelief;
  updateBelief: (atIndex: number, newStatus: BeliefStatus, setDetailed?: boolean) => void;
  deleteBelief: (atIndex: number, isDetailed?: boolean) => void;
  setDisplay: (newDisplay: Display) => void;
  fromView: Display | null;
  millisecondsTillStale: number;
}

export default function BeliefDetail({
  wrappedOptionalBelief,
  updateBelief,
  deleteBelief,
  setDisplay,
  fromView,
  millisecondsTillStale
}: Props): JSX.Element {
  if (wrappedOptionalBelief === null) {
    return <p>You should not be viewing this page with a null belief.</p>;
  }

  if (fromView === null) {
    return <p>You should not be viewing this page with a null navBack.</p>;
  }

  const [belief, index] = wrappedOptionalBelief;
  const latestBelief = getLatestBelief(belief);

  function deleteBeliefInner(): void {
    deleteBelief(index, true);
    if (fromView !== null) {
      setDisplay(fromView);
    }
  }

  const timeDiff = Date.now() - latestBelief.time < millisecondsTillStale;
  const staleAlert = timeDiff ? null : (
    <div
      className='notifBanner'
      style={{ cursor: 'default' }}
    >
      <p>This belief is old - you should consider updating it</p>
    </div>
  );

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

  if (!timeDiff) {
    const keepSmallBtn = (
      <BeliefBtn
        small
        className='beliefCardExtraBtn'
        onClick={(): void => updateBelief(index, latestBelief.status, true)}
      >
        Keep this belief
      </BeliefBtn>
    );
    beliefBtns.push(keepSmallBtn);
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

  const updatesTimeline = [belief.savedAs].concat(belief.updates).reverse().map(beliefUpdate => (
    <Timeline.Item key={beliefUpdate.time}>
      <span className='timeSpan'>
        <p className='timeText'>{(new Date(beliefUpdate.time)).toLocaleString()}</p>
        <Tag color={accessCSSBeliefColor(beliefUpdate.status)}>{beliefUpdate.status}</Tag>
      </span>
    </Timeline.Item>
  ));

  return (
    <>
      {staleAlert}
      <div className='beliefDetailContainer'>

        <div className={`headerContainer ${titleClassColor}`}>
          <div className='header'>

            <LeftOutlined
              className='backBtn'
              onClick={(): void => setDisplay(fromView)}
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

            <Popconfirm
              placement='bottomRight'
              title='Are you sure you want to delete this belief?'
              onConfirm={(): void => deleteBeliefInner()}
              okText='Yes'
              cancelText='No'
            >
              <HoverBtn
                className='deleteBtn'
                type='circle'
              >
                <DeleteOutlined />
              </HoverBtn>
            </Popconfirm>

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

          <Timeline style={{ margin: '20px' }}>
            {updatesTimeline}
          </Timeline>

        </div>

      </div>
    </>
  );
}