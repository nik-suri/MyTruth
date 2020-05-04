interface Beliefs {
  beliefs: string[];
  millisecondsTillStale: number;
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('installed');

  const threeWeekMilliseconds = 1814400000;

  // instantiate values
  const beliefs: Beliefs = {
    beliefs: [],
    millisecondsTillStale: threeWeekMilliseconds
  };
  
  chrome.storage.sync.set(beliefs, function() {
    console.log('initial belief values (empty) set.');
  });
});