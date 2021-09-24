import React, { useState, useEffect } from 'react'
import { css, cx } from 'linaria'

const styleForApp = css`
  width: 120px;
  height: 120px;
  max-height: 0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  &.valid {
    max-height: 200px;
    transition: max-height ease-in 250ms;
  }
  .saveBlock {
    font-size: 1.2rem;
  }
`

const App = () => {
  const [isValid, setIsValid] = useState(false)

  useEffect(async () => {
    const { url, id: tabId, title } = await getCurrentTab()
    console.log(url, tabId, title)
    setIsValid(true)
  }, [])

  return (
    <div className={cx(styleForApp, isValid && 'valid')}>
      <div className="saveBlock">{isValid ? 'Saved!' : 'Saving ...'}</div>
    </div>
  )
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

export default App
