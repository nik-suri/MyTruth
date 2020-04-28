import { Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { BeliefStatus, bkg, Display } from '../util';

interface Props {
  switchDisplay: (newDisplay: Display) => void;
}

export default function Beliefs({ switchDisplay }: Props) {
  const [trueBeliefs, setTrueBeliefs] = useState<string[]>([])
  const [falseBeliefs, setFalseBeliefs] = useState<string[]>([])
  const [unsureBeliefs, setUnsureBeliefs] = useState<string[]>([])

  useEffect(() => {
    chrome.storage.sync.get([
      BeliefStatus.True,
      BeliefStatus.False, 
      BeliefStatus.Unsure
    ], data => {
      bkg?.console.log(data)
      setTrueBeliefs(data[BeliefStatus.True])
      setFalseBeliefs(data[BeliefStatus.False])
      setUnsureBeliefs(data[BeliefStatus.Unsure])
    })
  }, [])

  const trueListElements: JSX.Element[] = trueBeliefs.map((belief, i) => (
    <div key={i}>
      {belief}
    </div>
  ))

  const falseListElements: JSX.Element[] = falseBeliefs.map((belief, i) => (
    <div key={i}>
      {belief}
    </div>
  ))
  const usureListElements: JSX.Element[] = unsureBeliefs.map((belief, i) => (
    <div key={i}>
      {belief}
    </div>
  ))

  return (
    <>
      <Row justify='space-between'>
        <Col span={4}>
          {trueListElements}
        </Col>
        <Col span={4}>
          {falseListElements}
        </Col>
        <Col span={4}>
          {usureListElements}
        </Col>
      </Row>
    </>
  )
}

// seeMoreBtn.onclick = function () {
//   setContentView(DisplaySetting.beliefs)

//   chrome.storage.sync.get(Object.values(BeliefStatus), function (data) {
//     bkg.console.log(data)
//     data[BeliefStatus.true].forEach(belief => {
//       const li = document.createElement('li')
//       li.className = 'list-group-item'
//       li.textContent = belief
//       trueList.appendChild(li)
//     })

//     data[BeliefStatus.false].forEach(belief => {
//       const li = document.createElement('li')
//       li.className = 'list-group-item'
//       li.textContent = belief
//       falseList.appendChild(li)
//     })
//   })
// }