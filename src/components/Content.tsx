import { Col, Empty, Row, Typography } from 'antd';
import React from 'react';
import { TrueBeliefBtn, FalseBeliefBtn, UnsureBeliefBtn } from '../lib/BeliefBtns';
import { BeliefStatus, Display } from '../lib/util';

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
            <TrueBeliefBtn
              onClick={(): void => saveBelief(selection, BeliefStatus.True)}
            />
          </Col>
          <Col>
            <FalseBeliefBtn
              onClick={(): void => saveBelief(selection, BeliefStatus.False)}
            />
          </Col>
          <Col>
            <UnsureBeliefBtn
              onClick={(): void => saveBelief(selection, BeliefStatus.Unsure)}
            />
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