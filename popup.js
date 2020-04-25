const bkg = chrome.extension.getBackgroundPage()

window.onload = function () {
  chrome.tabs.executeScript({
    code: 'window.getSelection().toString();'
  }, selection => {
    bkg.console.log(selection)
    document.getElementById("selection").textContent = selection[0]
  })
}

document.getElementById('trueBtn').onclick = function() {
  const belief = document.getElementById('selection').textContent

  chrome.storage.sync.get('trueBeliefs', function(data) {
    const currentValue = data.trueBeliefs
    bkg.console.log('Value currently is ', currentValue)

    const newValue = currentValue.concat(belief)

    chrome.storage.sync.set({ trueBeliefs: newValue}, function() {
      bkg.console.log('Value is set to ', newValue);
    })
  })
}

document.getElementById('falseBtn').onclick = function() {
  const belief = document.getElementById('selection').textContent

  chrome.storage.sync.get('falseBeliefs', function(data) {
    const currentValue = data.falseBeliefs
    bkg.console.log('Value currently is ', currentValue)
    
    const newValue = currentValue.concat(belief)

    chrome.storage.sync.set({ falseBeliefs: newValue}, function() {
      bkg.console.log('Value is set to ', newValue);
    })
  })
}

document.getElementById('seeMoreBtn').onclick = function() {
  chrome.storage.sync.get(['trueBeliefs', 'falseBeliefs'], function(data) {
    bkg.console.log(data)
    bkg.console.log('True beliefs', data.trueBeliefs)
    bkg.console.log('False beliefs', data.falseBeliefs)
  })
}