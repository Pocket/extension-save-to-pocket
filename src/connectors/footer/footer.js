import React from 'react'
import { Footer } from 'components/footer/footer'

export const FooterConnector = () => {
  const settingsClick = () => console.log('settings clicked') //chrome.runtime.openOptionsPage()

  return (
    <Footer settingsClick={settingsClick} />
  )
}
