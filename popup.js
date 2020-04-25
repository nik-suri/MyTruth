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
  bkg.console.log('true')
}

document.getElementById('falseBtn').onclick = function() {
  bkg.console.log('false')
}