interface StorageValues {
  beliefs: string[];
  millisecondsTillStale: number;
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('installed');

  chrome.storage.sync.get(null, data => {
    if (!data.beliefs) {
      console.log('Setting initial values..');

      const threeWeekMilliseconds = 1814400000;

      // instantiate values
      const beliefs: StorageValues = {
        beliefs: [],
        millisecondsTillStale: threeWeekMilliseconds
      };
      
      chrome.storage.sync.set(beliefs, function() {
        console.log('initial object set.');
      });
    } else {
      console.log('Data currently stored is', data);
    }
  });
});