import React, { useState, useEffect } from 'react'
import Content from './components/Content'
import Beliefs from './components/Beliefs'
import SaveSuccess from './components/SaveSuccess'
import { Display, bkg } from './util'
import './css/Popup.css'

export default function Popup() {
  const [isLoading, setIsLoading] = useState(true)
  const [display, setDisplay] = useState<Display>(Display.Main)
  const [selection, setSelection] = useState('')

  useEffect(() => {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString().trim();'
    }, selectionArr => {
      bkg?.console.log(selectionArr)
      setSelection(selectionArr[0])
      setIsLoading(false)
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
      displayContent = <SaveSuccess switchDisplay={switchDisplay} />
      break
    case Display.Beliefs:
      displayContent = (
        <Beliefs 
          switchDisplay={switchDisplay}
        />
      )
      break
  }

  return isLoading ? <></> : displayContent
}