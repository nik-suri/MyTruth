import { RightOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import React, { useEffect, useState } from 'react';
import Beliefs from './components/Beliefs';
import Content from './components/Content';
import SaveSuccess from './components/SaveSuccess';
import BeliefDetail from './components/BeliefDetail';
import Settings from './components/Settings';
import psl from 'psl';
import { bkg, getLatestBelief } from './lib/util';

export default function Popup(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState<Display>(Display.Main);
  const [selection, setSelection] = useState('');
  const [selectionSavedAs, setSelectionSavedAs] = useState<BeliefStatus | null>(null);
  const [millisecondsTillStale, setMillisecondsTillStale] = useState(0);
  const [beliefs, setBeliefs] = useState<SavedBelief[]>([]);
  const [detailBeliefFromView, setDetailBeliefFromView] = useState<Display | null>(null);
  const [detailedBelief, setDetailedBelief] = useState<WrappedOptionalBelief>(null);

  useEffect(() => {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString().trim();'
    }, selectionArr => {
      bkg?.console.log(selectionArr);
      setSelection(selectionArr[0]);
      setIsLoading(false);
    });

    chrome.storage.sync.get(['beliefs', 'millisecondsTillStale'], data => {
      const savedBeliefs: SavedBelief[] = data.beliefs;
      const millisecondsTillStale: number = data.millisecondsTillStale;
      setMillisecondsTillStale(millisecondsTillStale);
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
      // const saveTime = Date.now() - 604800000; // for testing 1 week staleness

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

      setSelectionSavedAs(status);
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
      bkg?.console.log('Updated beliefs in storage', newBeliefs);
    });

    if (setDetailed) {
      const updatingBeliefCopy = cloneDeep(updatingBelief);
      const newWrappedOptional: WrappedOptionalBelief = [updatingBeliefCopy, atIndex];
      setDetailedBelief(newWrappedOptional);
    }

    setBeliefs(newBeliefs);
  }

  function deleteBelief(atIndex: number, isDetailed = false): void {
    const newBeliefs = cloneDeep(beliefs);
    newBeliefs.splice(atIndex, 1);

    chrome.storage.sync.set({ 'beliefs': newBeliefs }, () => {
      bkg?.console.log('Updated beliefs in storage', newBeliefs);
    });

    if (isDetailed) {
      setDetailedBelief(null);
    }

    setBeliefs(newBeliefs);
  }

  function calculateStaleBeliefs(): WrappedStaleBelief[] {
    const currentTime = Date.now();

    return beliefs.reduce((acc: WrappedStaleBelief[], belief, index) => {
      const wrappedStaleBelief: WrappedStaleBelief = {
        savedBelief: belief,
        savedIndex: index
      };

      const beliefTimeRef = getLatestBelief(belief).time;
      if (currentTime - beliefTimeRef >= millisecondsTillStale) {
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
        <p>Old beliefs - Update them now!</p>
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
          selectionSavedAs={selectionSavedAs}
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
          beliefs={beliefs}
          updateBelief={updateBelief}
          setDetailedBelief={setDetailedBelief}
          setDetailBeliefFromView={setDetailBeliefFromView}
          setDisplay={setDisplay}
        />
      </>
    );
    break;
  case Display.StaleBeliefs:
    displayContent = (
      <Beliefs
        stale
        beliefs={staleBeliefs}
        updateBelief={updateBelief}
        setDetailedBelief={setDetailedBelief}
        setDetailBeliefFromView={setDetailBeliefFromView}
        setDisplay={setDisplay}
      />
    );
    break;
  case Display.BeliefDetail:
    displayContent = (
      <BeliefDetail
        wrappedOptionalBelief={detailedBelief}
        updateBelief={updateBelief}
        deleteBelief={deleteBelief}
        setDisplay={setDisplay}
        fromView={detailBeliefFromView}
        millisecondsTillStale={millisecondsTillStale}
      />
    );
    break;
  case Display.Settings:
    displayContent = (
      <Settings
        millisecondsTillStale={millisecondsTillStale}
        setMillisecondsTillStale={setMillisecondsTillStale}
        setDisplay={setDisplay}
      />
    );
    break;
  }

  return isLoading ? <></> : displayContent;
}