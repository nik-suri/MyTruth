interface Beliefs {
  beliefs: string[];
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('installed');

  // instantiate values
  const beliefs: Beliefs = {
    beliefs: []
  };
  
  chrome.storage.sync.set(beliefs, function() {
    console.log('initial belief values (empty) set.');
  });
});