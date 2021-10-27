import React from 'react'
import { Footer } from 'components/footer/footer'

import { OPEN_POCKET } from 'actions'
import { OPEN_OPTIONS } from 'actions'

export const FooterConnector = () => {
  const myListClick = () => chrome.runtime.sendMessage({ type: OPEN_POCKET })
  const settingsClick = () => chrome.runtime.sendMessage({ type: OPEN_OPTIONS })

  return (
    <Footer
      myListClick={myListClick}
      settingsClick={settingsClick}
    />
  )
}
