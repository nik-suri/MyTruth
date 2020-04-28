import * as React from 'react';
import { Display, BeliefStatus, bkg } from '../util';

interface Props {
  switchDisplay: (newDisplay: Display) => void;
}

export default function Beliefs({ switchDisplay }: Props) {
  React.useEffect(() => {
    chrome.storage.sync.get([
      BeliefStatus.True,
      BeliefStatus.False, 
      BeliefStatus.Unsure
    ], data => {
      bkg?.console.log(data)
    })
  })

  return <>Beliefs</>
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