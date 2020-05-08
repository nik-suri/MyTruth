import { LeftOutlined } from '@ant-design/icons';
import { InputNumber, message } from 'antd';
import React, { useState } from 'react';
import { bkg } from '../lib/util';

const millisecondsPerWeek = 604800000;

interface Props {
  millisecondsTillStale: number;
  setMillisecondsTillStale: (newMilliseconds: number) => void;
  setDisplay: (newDisplay: Display) => void;
}

export default function Settings({
  millisecondsTillStale,
  setMillisecondsTillStale,
  setDisplay
}: Props): JSX.Element {
  const [settingDidChange, setSettingDidChange] = useState(false);
  const [innerMillisecondsTillStale, setInnerMillisecondsTillStale] = useState(millisecondsTillStale);

  function saveSettings(): void {
    chrome.storage.sync.set({ 'millisecondsTillStale': innerMillisecondsTillStale }, () => {
      bkg?.console.log('Value is set to ', innerMillisecondsTillStale);
      message.success('Settings Saved!', 1);
    });

    setMillisecondsTillStale(innerMillisecondsTillStale);
  }

  function weeksOnChange(value: number | undefined): void {
    if (!value) { return; }

    const weekMultiplier = value;
    const newMilisecondsTillStale = weekMultiplier * millisecondsPerWeek;

    setInnerMillisecondsTillStale(newMilisecondsTillStale);
    setSettingDidChange(true);
  }

  const saveBtn: JSX.Element | null = !settingDidChange ? null : (
    <div
      className='customBtn pop green'
      style={{ textAlign: 'center' }}
      onClick={(): void => saveSettings()}
    >
      Save
    </div>
  );

  return (
    <div className='settingsDisplay'>
      <div className='header'>
        <LeftOutlined
          className='backBtn'
          onClick={(): void => setDisplay(Display.Main)}
        />
        <p className='text'>Settings</p>
      </div>
      <div className='staleBeliefCutoff'>
        <div>
          <p>Stale Belief Cutoff:</p>
          <p className='infoText'>
            * This sets the amount of time after you save a belief until you are notified to update it.
          </p>
        </div>
        <InputNumber
          style={{ width: '70px', height: 'min-content' }}
          size='small'
          min={1}
          max={8}
          defaultValue={Math.round(millisecondsTillStale / millisecondsPerWeek)}
          onChange={weeksOnChange}
        />
        <p>weeks</p>
      </div>
      {saveBtn}
    </div>
  );
}