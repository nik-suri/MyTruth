import { RightOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import React, { useEffect, useState } from 'react';
import Beliefs from './components/Beliefs';
import Content from './components/Content';
import SaveSuccess from './components/SaveSuccess';
import BeliefDetail from './components/BeliefDetail';
import psl from 'psl';
import { bkg, getLatestBelief } from './lib/util';

export default function Popup(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState<Display>(Display.Main);
  const [selection, setSelection] = useState('');
  const [beliefs, setBeliefs] = useState<SavedBelief[]>([]);
  const [detailedBelief, setDetailedBelief] = useState<WrappedOptionalBelief>(null);

  useEffect(() => {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString().trim();'
    }, selectionArr => {
      bkg?.console.log(selectionArr);
      setSelection(selectionArr[0]);
      setIsLoading(false);
    });

    chrome.storage.sync.get('beliefs', data => {
      const savedBeliefs: SavedBelief[] = data.beliefs;
      setBeliefs(savedBeliefs);
    });
  }, []);

  // from https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
  function extractHostname(url: string): string {
    let hostname: string;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    }
    else {
      hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }

  function saveBelief(belief: string, status: BeliefStatus): void {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      const url = tabs[0].url;

      let urlDomain: string | null;
      if (url) {
        urlDomain = psl.get(extractHostname(url));
      } else {
        urlDomain = null;
      }

      const currentBeliefs = cloneDeep(beliefs);

      const saveTime = Date.now();
      // const saveTime = Date.now() - 1814400000; // for testing

      const savedAs: BeliefUpdate = {
        status: status,
        time: saveTime
      };

      const newSavedBelief: SavedBelief = {
        belief: belief,
        savedAs: savedAs,
        updates: [],
        url: url,
        urlDomain: urlDomain
      };

      const newBeliefs = currentBeliefs.concat(newSavedBelief);

      chrome.storage.sync.set({ 'beliefs': newBeliefs }, () => {
        bkg?.console.log('Value is set to ', newBeliefs);
      });

      setBeliefs(newBeliefs);
      setDisplay(Display.SaveSuccess);
    });
  }

  function updateBelief(
    atIndex: number,
    newStatus: BeliefStatus,
    setDetailed = false
  ): void {
    const newBeliefs = cloneDeep(beliefs);
    const updatingBelief = newBeliefs[atIndex];

    const newUpdate: BeliefUpdate = {
      status: newStatus,
      time: Date.now()
    };
    updatingBelief.updates.push(newUpdate);

    chrome.storage.sync.set({ 'beliefs': newBeliefs }, () => {
      bkg?.console.log('Updated beliefs in storage.');
    });

    if (setDetailed) {
      const updatingBeliefCopy = cloneDeep(updatingBelief);
      const newWrappedOptional: WrappedOptionalBelief = [updatingBeliefCopy, atIndex];
      setDetailedBelief(newWrappedOptional);
    }

    setBeliefs(newBeliefs);
  }

  function calculateStaleBeliefs(): WrappedStaleBelief[] {
    const currentTime = Date.now();
    const staleTimeDiff = 1814400000; // milliseconds representing 3 weeks
    return beliefs.reduce((acc: WrappedStaleBelief[], belief, index) => {
      const wrappedStaleBelief: WrappedStaleBelief = {
        savedBelief: belief,
        savedIndex: index
      };

      const beliefTimeRef = getLatestBelief(belief).time;
      if (currentTime - beliefTimeRef >= staleTimeDiff) {
        return acc.concat(wrappedStaleBelief);
      }
      return acc;
    }, []);
  }

  const staleBeliefs = calculateStaleBeliefs();

  const staleBeliefsNotif: JSX.Element | null = staleBeliefs.length === 0
    ? null
    : (
      <div
        className='notifBanner'
        onClick={(): void => setDisplay(Display.StaleBeliefs)}
      >
        <p id='notifBannerText'>Old beliefs - Update them now!</p>
        <Badge
          className='notifBannerBadge'
          count={staleBeliefs.length}
          overflowCount={20}
        />
        <RightOutlined id='notifBannerArrow' />
      </div>
    );

  let displayContent: JSX.Element;
  switch (display as Display) {
  case Display.Main:
    displayContent = (
      <>
        {staleBeliefsNotif}
        <Content
          selection={selection}
          saveBelief={saveBelief}
          setDisplay={setDisplay}
        />
      </>
    );
    break;
  case Display.SaveSuccess:
    displayContent = (
      <>
        {staleBeliefsNotif}
        <SaveSuccess setDisplay={setDisplay} />
      </>
    );
    break;
  case Display.Beliefs:
    displayContent = (
      <>
        {staleBeliefsNotif}
        <Beliefs
          title={'My Beliefs'}
          beliefs={beliefs}
          updateBelief={updateBelief}
          setDetailedBelief={setDetailedBelief}
          setDisplay={setDisplay}
        />
      </>
    );
    break;
  case Display.StaleBeliefs:
    displayContent = (
      <Beliefs
        title={'My Old Beliefs'}
        beliefs={staleBeliefs}
        updateBelief={updateBelief}
        setDetailedBelief={setDetailedBelief}
        setDisplay={setDisplay}
      />
    );
    break;
  case Display.BeliefDetail:
    displayContent = (
      <BeliefDetail
        wrappedOptionalBelief={detailedBelief}
        updateBelief={updateBelief}
        setDisplay={setDisplay}
      />
    );
    break;
  }

  return isLoading ? <></> : displayContent;
}