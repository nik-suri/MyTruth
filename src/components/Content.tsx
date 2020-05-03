import { Button, Card, Empty, Typography } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import React from 'react';
import { TrueBeliefBtn, FalseBeliefBtn, UnsureBeliefBtn } from '../lib/BeliefBtns';
import HoverBtn from '../lib/HoverBtn';

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
        <div id='content'>
          <Text strong>{selection}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TrueBeliefBtn
            className='beliefSelection'
            onClick={(): void => saveBelief(selection, BeliefStatus.True)}
          />
          <FalseBeliefBtn
            className='beliefSelection'
            onClick={(): void => saveBelief(selection, BeliefStatus.False)}
          />
          <UnsureBeliefBtn
            className='beliefSelection'
            onClick={(): void => saveBelief(selection, BeliefStatus.Unsure)}
          />
        </div>
      </>
    );

  return (
    <>
      <div className='contentHeader'>
        <div className='title'>MyTruth</div>
        <div style={{ display: 'flex' }}>
          <HoverBtn
            className='contribute'
            onClick={(): void => chrome.tabs.create({ url: 'https://github.com/nik-suri/MyTruth' })}
          >
            <Button 
              type='link'
              style={{ color: 'white', fontSize: '15px' }}
            >
              Contribute
            </Button>
          </HoverBtn>
          <HoverBtn
            type='circle'
            onClick={(): void => setDisplay(Display.Settings)}
          >
            <SettingFilled style={{ color: 'white', fontSize: '20px' }}/>
          </HoverBtn>
        </div>
      </div>
      <div className='contentWrapper'>
        <Card className='claimSelection'>
          {selectionSection}
        </Card>
        <div
          className='customBtn bluePop contentNavBtn'
          onClick={(): void => setDisplay(Display.Beliefs)}
        >
          See my Beliefs
        </div>
      </div>
    </>
  );
}