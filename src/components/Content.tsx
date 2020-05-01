import { Col, Empty, Row, Typography } from 'antd';
import React from 'react';
import '../css/Content.css';
import { BeliefStatus, bkg, Display, SavedBelief } from '../util';

const { Text } = Typography;

interface Props {
  selection: string;
  setBeliefs: (newBeliefs: SavedBelief[]) => void;
  setDisplay: (newDisplay: Display) => void;
}

export default function Content({ selection, setBeliefs, setDisplay }: Props): JSX.Element {

  function saveBelief(status: BeliefStatus): void {
    chrome.storage.sync.get('beliefs', data => {
      const currentBeliefs: SavedBelief[] = data.beliefs;

      const saveTime = Date.now();
      // const saveTime = Date.now() - 1814400000; // for testing

      const newSavedBelief: SavedBelief = {
        belief: selection,
        status: status,
        savedTime: saveTime,
        updatedTime: null
      };

      const newBeliefs = currentBeliefs.concat(newSavedBelief);

      chrome.storage.sync.set({ 'beliefs': newBeliefs }, () => {
        bkg?.console.log('Value is set to ', newBeliefs);
      });

      setBeliefs(newBeliefs);
      setDisplay(Display.SaveSuccess);
    });
  }

  const selectionSection: JSX.Element = selection === ''
    ? (
      <Empty
        description={
          <span>
            Highlight some text and press ctrl+shift+s (cmd+shift+s if mac)!
          </span>
        }
      />
    )
    : (
      <>
        <Row id='selectionRow'>
          <Text strong>{selection}</Text>
        </Row>
        <Row justify='space-around'>
          <Col>
            <div
              className='customBtn green'
              onClick={(): void => saveBelief(BeliefStatus.True)}
            >
              True
            </div>
          </Col>
          <Col>
            <div
              className='customBtn red'
              onClick={(): void => saveBelief(BeliefStatus.False)}
            >
              False
            </div>
          </Col>
          <Col>
            <div
              className='customBtn yellow'
              onClick={(): void => saveBelief(BeliefStatus.Unsure)}
            >
              Unsure
            </div>
          </Col>
        </Row>
      </>
    );

  return (
    <div className='contentWrapper'>
      {selectionSection}
      <div
        className='customBtn bluePop contentNavBtn'
        onClick={(): void => setDisplay(Display.Beliefs)}
      >
        See my Beliefs
      </div>
    </div>
  );
}