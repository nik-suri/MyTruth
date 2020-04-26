const bkg = chrome.extension.getBackgroundPage()

const DisplaySetting = Object.freeze({
  "main": 0,
  "saveSuccess": 1,
  "beliefs": 2
})

const BeliefStatus = Object.freeze({
  "true": 'trueBeliefs',
  "false": 'falseBeliefs',
  "unsure": 'unsureBeliefs'
})

const mainContent = document.getElementById('mainContent')
const saveSuccessContent = document.getElementById('saveSuccessContent')
const beliefsContent = document.getElementById('beliefsContent')

const selectionEl = document.getElementById('selection')
const trueBtn = document.getElementById('trueBtn')
const falseBtn = document.getElementById('falseBtn')
const unsureBtn = document.getElementById('unsureBtn')
const seeMoreBtn = document.getElementById('seeMoreBtn')

function setContentView(displaySetting) {
  switch (displaySetting) {
    case DisplaySetting.main:
      mainContent.style.display = 'block'
      saveSuccessContent.style.display = 'none'
      beliefsContent.style.display = 'none'
      break
    case DisplaySetting.saveSuccess:
      mainContent.style.display = 'none'
      saveSuccessContent.style.display = 'block'
      beliefsContent.style.display = 'none'
      break
    case DisplaySetting.beliefs:
      mainContent.style.display = 'none'
      saveSuccessContent.style.display = 'none'
      beliefsContent.style.display = 'block'
      break
    default:
      bkg.console.log('Incorrect parameter passed to setContentView')
      mainContent.style.display = 'block'
      saveSuccessContent.style.display = 'none'
      beliefsContent.style.display = 'none'
  }
}

window.onload = function () {
  this.setContentView(DisplaySetting.main)

  chrome.tabs.executeScript({
    code: 'window.getSelection().toString().trim();'
  }, selectionArr => {
    bkg.console.log(selectionArr)
    const selection = selectionArr[0]

    if (selection === '') {
      trueBtn.style.display = 'none'
      falseBtn.style.display = 'none'
      unsureBtn.style.display = 'none'
    }

    selectionEl.textContent = selection
  })
}

function saveBelief(status) {
  const belief = selectionEl.textContent

  chrome.storage.sync.get(status, function (data) {
    const currentValue = data[status]
    bkg.console.log('Value currently is ', currentValue)

    const newValue = currentValue.concat(belief)

    chrome.storage.sync.set({ [status]: newValue }, function () {
      bkg.console.log('Value is set to ', newValue);
    })
  })

  setContentView(DisplaySetting.saveSuccess)
}

trueBtn.onclick = function () {
  saveBelief(BeliefStatus.true)
}

falseBtn.onclick = function () {
  saveBelief(BeliefStatus.false)
}

unsureBtn.onclick = function () {
  saveBelief(BeliefStatus.unsure)
}

seeMoreBtn.onclick = function () {
  setContentView(DisplaySetting.beliefs)

  chrome.storage.sync.get(Object.values(BeliefStatus), function (data) {
    bkg.console.log(data)
  })
}