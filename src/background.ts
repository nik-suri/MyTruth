interface IBeliefs {
  true: string[],
  false: string[],
  unsure: string[]
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('installed')

  // instantiate values
  const beliefs: IBeliefs = {
    true: [],
    false: [],
    unsure: []
  }
  
  chrome.storage.sync.set(beliefs, function() {
    console.log('initial belief values (empty) set.')
  })
})