import React, { useState, useEffect, useRef } from 'react'
import { cx } from 'linaria'
import { Doorhanger } from 'components/doorhanger/doorhanger'
import { HeadingConnector } from 'connectors/heading/heading'
import { ItemPreviewConnector } from 'connectors/item-preview/item-preview'
import { TaggingConnector } from 'connectors/tagging/tagging'
import { FooterConnector } from 'connectors/footer/footer'
import { getSetting } from 'common/interface'
import { getOSModeClass } from 'common/helpers'
import { globalVariables, globalReset } from './globalStyles'
import { getBool } from 'common/utilities'

import { SAVE_TO_POCKET_REQUEST } from 'actions'
import { SAVE_TO_POCKET_SUCCESS } from 'actions'
import { SAVE_TO_POCKET_FAILURE } from 'actions'

import { REMOVE_ITEM_REQUEST } from 'actions'
import { REMOVE_ITEM_SUCCESS } from 'actions'
import { REMOVE_ITEM_FAILURE } from 'actions'

import { TAG_SYNC_REQUEST } from 'actions'
import { TAG_SYNC_SUCCESS } from 'actions'
import { TAG_SYNC_FAILURE } from 'actions'
import { UPDATE_TAG_ERROR } from 'actions'

const IS_RELEASE = getBool(process.env.IS_RELEASE)

export const App = () => {
  const appTarget = useRef(null)
  const [saveStatus, setSaveStatus] = useState('saving')
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('pocket-theme-system')

  /* Handle incoming messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const handleMessages = (event) => {
    const { payload, action = 'Unknown Action' } = event || {}

    if (!IS_RELEASE) {
      console.groupCollapsed(`RECEIVE: ${action}`)
      console.log(payload)
      console.groupEnd(`RECEIVE: ${action}`)
    }

    switch (action) {
      case SAVE_TO_POCKET_REQUEST: {
        setIsOpen(true)
        return setSaveStatus('saving')
      }

      case SAVE_TO_POCKET_SUCCESS: {
        return setSaveStatus('saved')
      }

      case SAVE_TO_POCKET_FAILURE: {
        return setSaveStatus('save_failed')
      }

      case REMOVE_ITEM_REQUEST: {
        return setSaveStatus('removing')
      }

      case REMOVE_ITEM_SUCCESS: {
        return setSaveStatus('removed')
      }

      case REMOVE_ITEM_FAILURE: {
        return setSaveStatus('remove_failed')
      }

      case TAG_SYNC_REQUEST: {
        return setSaveStatus('tags_saving')
      }

      case TAG_SYNC_SUCCESS: {
        return setSaveStatus('tags_saved')
      }

      case TAG_SYNC_FAILURE: {
        return setSaveStatus('tags_failed')
      }

      case UPDATE_TAG_ERROR: {
        const { errorStatus } = payload
        const errorState = errorStatus ? 'tags_error' : 'saved'
        return setSaveStatus(errorState)
      }

      default: {
        return
      }
    }
  }

  useEffect(async () => {
    let newTheme = await getSetting('theme') || 'system'
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

  const isRemoved = saveStatus === 'removed'

  return (
    <div ref={appTarget} className={cx(globalReset, globalVariables, theme)}>
      <Doorhanger isOpen={isOpen}>
        <HeadingConnector saveStatus={saveStatus} />
        {!isRemoved ? <ItemPreviewConnector /> : null}
        {!isRemoved ? <TaggingConnector closePanel={closePanel} /> : null}
        <FooterConnector />
      </Doorhanger>
    </div>
  )
}
