import { Col, Empty, Row, Typography } from 'antd';
import React from 'react';
import '../css/Content.css';
import { BeliefStatus, Display } from '../util';

const { Text } = Typography;

interface Props {
  selection: string;
  saveBelief: (belief: string, status: BeliefStatus) => void;
  setDisplay: (newDisplay: Display) => void;
}

export default function Content({ selection, saveBelief, setDisplay }: Props): JSX.Element {

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
              onClick={(): void => saveBelief(selection, BeliefStatus.True)}
            >
              True
            </div>
          </Col>
          <Col>
            <div
              className='customBtn red'
              onClick={(): void => saveBelief(selection, BeliefStatus.False)}
            >
              False
            </div>
          </Col>
          <Col>
            <div
              className='customBtn yellow'
              onClick={(): void => saveBelief(selection, BeliefStatus.Unsure)}
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