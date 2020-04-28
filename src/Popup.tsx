import * as React from 'react'
import Content from './components/Content'
import { bkg } from './util'

export default function Popup() {
  const [selection, setSelection] = React.useState('')

  React.useEffect(() => {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString().trim();'
    }, selectionArr => {
      bkg.console.log(selectionArr)
      setSelection(selectionArr[0])
    })
  }, [])

  return (
    <div>
      <Content selection={selection} />
    </div>
  )
}