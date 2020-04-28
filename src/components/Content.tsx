import { Button, Col, Row, Typography } from 'antd';
import * as React from 'react';
import { bkg } from '../util';

const { Text } = Typography;

interface Props {
  selection: string;
}

export default function Content({ selection }: Props) {
  bkg.console.log(selection)

  const selectionSection: JSX.Element = selection === '' ? null : (
    <>
      <Row>
        <Text strong>{selection}</Text>
      </Row>
      <Row justify='space-around'>
        <Col>
          <Button type='primary'>True</Button>
        </Col>
        <Col>
          <Button type='danger'>False</Button>
        </Col>
        <Col>
          <Button type='primary'>Unsure</Button>
        </Col>
      </Row>
    </>
  )

  return (
    <div>
      {selectionSection}
      <Button type="link">Click here to see your beliefs</Button>
    </div>
  )
}

// const DisplaySetting = Object.freeze({
//   "main": 0,
//   "saveSuccess": 1,
//   "beliefs": 2
// })

// const BeliefStatus = Object.freeze({
//   "true": 'trueBeliefs',
//   "false": 'falseBeliefs',
//   "unsure": 'unsureBeliefs'
// })

// const mainContent = document.getElementById('mainContent')
// const saveSuccessContent = document.getElementById('saveSuccessContent')
// const beliefsContent = document.getElementById('beliefsContent')

// const selectionEl = document.getElementById('selection')
// const trueBtn = document.getElementById('trueBtn')
// const falseBtn = document.getElementById('falseBtn')
// const unsureBtn = document.getElementById('unsureBtn')
// const seeMoreBtn = document.getElementById('seeMoreBtn')

// const trueList = document.getElementById('trueList')
// const falseList = document.getElementById('falseList')
// const unsureList = document.getElementById('unsureList')

// function setContentView(displaySetting) {
//   switch (displaySetting) {
//     case DisplaySetting.main:
//       mainContent.style.display = 'block'
//       saveSuccessContent.style.display = 'none'
//       beliefsContent.style.display = 'none'
//       break
//     case DisplaySetting.saveSuccess:
//       mainContent.style.display = 'none'
//       saveSuccessContent.style.display = 'block'
//       beliefsContent.style.display = 'none'
//       break
//     case DisplaySetting.beliefs:
//       mainContent.style.display = 'none'
//       saveSuccessContent.style.display = 'none'
//       beliefsContent.style.display = 'block'
//       break
//     default:
//       bkg.console.log('Incorrect parameter passed to setContentView')
//       mainContent.style.display = 'block'
//       saveSuccessContent.style.display = 'none'
//       beliefsContent.style.display = 'none'
//   }
// }

// window.onload = function () {
//   this.setContentView(DisplaySetting.main)

//   chrome.tabs.executeScript({
//     code: 'window.getSelection().toString().trim();'
//   }, selectionArr => {
//     bkg.console.log(selectionArr)
//     const selection = selectionArr[0]

//     if (selection === '') {
//       trueBtn.style.display = 'none'
//       falseBtn.style.display = 'none'
//       unsureBtn.style.display = 'none'
//     }

//     selectionEl.textContent = selection
//   })
// }

// function saveBelief(status) {
//   const belief = selectionEl.textContent

//   chrome.storage.sync.get(status, function (data) {
//     const currentValue = data[status]
//     bkg.console.log('Value currently is ', currentValue)

//     const newValue = currentValue.concat(belief)

//     chrome.storage.sync.set({ [status]: newValue }, function () {
//       bkg.console.log('Value is set to ', newValue);
//     })
//   })

//   setContentView(DisplaySetting.saveSuccess)
// }

// trueBtn.onclick = function () {
//   saveBelief(BeliefStatus.true)
// }

// falseBtn.onclick = function () {
//   saveBelief(BeliefStatus.false)
// }

// unsureBtn.onclick = function () {
//   saveBelief(BeliefStatus.unsure)
// }

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