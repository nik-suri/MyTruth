chrome.runtime.onInstalled.addListener(() => {
  console.log('installed')

  // instantiate values
  chrome.storage.sync.set({
    trueBeliefs: [],
    falseBeliefs: []
  }, function() {
    console.log('initial belief values (empty) set.')
  })
})