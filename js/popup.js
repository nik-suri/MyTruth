const bkg = chrome.extension.getBackgroundPage()
const selectionEl = document.getElementById('selection')
const trueBtn = document.getElementById('trueBtn')
const falseBtn = document.getElementById('falseBtn')
const seeMoreBtn = document.getElementById('seeMoreBtn')

window.onload = function () {
  chrome.tabs.executeScript({
    code: 'window.getSelection().toString().trim();'
  }, selectionArr => {
    bkg.console.log(selectionArr)
    const selection = selectionArr[0]

    if (selection === '') {
      trueBtn.style.display = 'none'
      falseBtn.style.display = 'none'
    }

    selectionEl.textContent = selection
  })
}

trueBtn.onclick = function() {
  const belief = selectionEl.textContent

  chrome.storage.sync.get('trueBeliefs', function(data) {
    const currentValue = data.trueBeliefs
    bkg.console.log('Value currently is ', currentValue)

    const newValue = currentValue.concat(belief)

    chrome.storage.sync.set({ trueBeliefs: newValue}, function() {
      bkg.console.log('Value is set to ', newValue);
    })
  })
}

falseBtn.onclick = function() {
  const belief = selectionEl.textContent

  chrome.storage.sync.get('falseBeliefs', function(data) {
    const currentValue = data.falseBeliefs
    bkg.console.log('Value currently is ', currentValue)
    
    const newValue = currentValue.concat(belief)

    chrome.storage.sync.set({ falseBeliefs: newValue}, function() {
      bkg.console.log('Value is set to ', newValue);
    })
  })
}

seeMoreBtn.onclick = function() {
  chrome.storage.sync.get(['trueBeliefs', 'falseBeliefs'], function(data) {
    bkg.console.log(data)
    bkg.console.log('True beliefs', data.trueBeliefs)
    bkg.console.log('False beliefs', data.falseBeliefs)
  })
}