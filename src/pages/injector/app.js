import React, { useState, useEffect, useRef } from 'react'
import { Doorhanger } from 'components/doorhanger/doorhanger'
import { HeadingConnector } from 'connectors/heading/heading'
import { ItemPreviewConnector } from 'connectors/item-preview/item-preview'
import { TaggingConnector } from 'connectors/tagging/tagging'
import { FooterConnector } from 'connectors/footer/footer'
import { getSetting } from 'common/interface'
import { getOSModeClass } from 'common/helpers'

import { SAVE_TO_POCKET_REQUEST } from 'actions'

export const App = () => {
  const appTarget = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('pocket-theme-light')

  /* Handle incoming messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const handleMessages = (event) => {
    const { payload, action = 'Unknown Action' } = event || {}

    console.groupCollapsed(`RECEIVE: ${action}`)
    console.log(payload)
    console.groupEnd(`RECEIVE: ${action}`)

    switch (action) {
      case SAVE_TO_POCKET_REQUEST: {
        return setIsOpen(true)
      }

      default: {
        return
      }
    }
  }

  useEffect(async () => {
    let newTheme = await getSetting('theme')
    if (newTheme === 'system') newTheme = getOSModeClass()
    setTheme(`pocket-theme-${newTheme}`)
  }, [])

  const handleDocumentClick = (e) => {
    if (appTarget?.current?.contains(e.target)) return
    setIsOpen(false)
  }

  useEffect(() => {
    setIsOpen(true)

    chrome.runtime.onMessage.addListener(handleMessages)
    document.addEventListener('click', handleDocumentClick)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessages)
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const closePanel = () => setIsOpen(false)

  return (
    <div ref={appTarget} className={theme}>
      <Doorhanger isOpen={isOpen}>
        <HeadingConnector />
        <ItemPreviewConnector />
        <TaggingConnector closePanel={closePanel} />
        <FooterConnector />
      </Doorhanger>
    </div>
  )
}
