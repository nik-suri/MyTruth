import * as React from 'react'
import Content from './components/Content'
import Beliefs from './components/Beliefs'
import { Display, bkg } from './util'

export default function Popup() {
  const [display, setDisplay] = React.useState<Display>(Display.Main)
  const [selection, setSelection] = React.useState('')

  React.useEffect(() => {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString().trim();'
    }, selectionArr => {
      bkg?.console.log(selectionArr)
      setSelection(selectionArr[0])
    })
  }, [])

  function switchDisplay(newDisplay: Display): void {
    setDisplay(newDisplay)
  }

  let displayContent: JSX.Element
  switch (display as Display) {
    case Display.Main:
      displayContent = (
        <Content
          selection={selection}
          switchDisplay={switchDisplay}
        />
      )
      break
    case Display.SaveSuccess:
      displayContent = (
        <Beliefs 
          switchDisplay={switchDisplay}
        />
      )
      break
    case Display.Beliefs:
      displayContent = <p>Beliefs</p>
      break
  }

  return (
    <>
      {displayContent}
    </>
  )
}