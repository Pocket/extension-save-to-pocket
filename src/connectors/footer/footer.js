import React from 'react'
import { Footer } from 'components/footer/footer'

export const FooterConnector = () => {
  const settingsClick = () => console.log('settings clicked')

  return (
    <Footer settingsClick={settingsClick} />
  )
}
