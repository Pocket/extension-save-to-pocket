import React, { useState, useEffect, useRef } from 'react'
import { Doorhanger } from 'connectors/doorhanger/doorhanger'

import { SAVE_TO_POCKET_REQUEST } from 'actions'
import { SAVE_TO_POCKET_SUCCESS } from 'actions'
import { SAVE_TO_POCKET_FAILURE } from 'actions'
import { REMOVE_ITEM_SUCCESS } from 'actions'
import { REMOVE_ITEM_FAILURE } from 'actions'
import { UPDATE_ITEM_PREVIEW } from 'actions'

export const App = () => {
  const appTarget = useRef(null)
  const [saveStatus, setSaveStatus] = useState('idle')
  const [itemPreview, setItemPreview] = useState({})

  /* Handle incoming messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const handleMessages = (event) => {
    const { payload, action = 'Unknown Action' } = event || {}
    console.groupCollapsed(`RECEIVE: ${action}`)
    console.log(payload)
    console.groupEnd(`RECEIVE: ${action}`)

    switch (action) {
      case SAVE_TO_POCKET_REQUEST: {
        return setSaveStatus('saving')
      }

      case SAVE_TO_POCKET_SUCCESS: {
        return setSaveStatus('saved')
      }

      case SAVE_TO_POCKET_FAILURE: {
        return setSaveStatus('save_failed')
      }

      case REMOVE_ITEM_SUCCESS: {
        return setSaveStatus('removed')
      }

      case REMOVE_ITEM_FAILURE: {
        return setSaveStatus('remove_failed')
      }

      case UPDATE_ITEM_PREVIEW: {
        const { item } = payload
        return setItemPreview(item)
      }

      default: {
        return
      }
    }
  }

  useEffect(() => {
    setSaveStatus('saving')
    chrome.runtime.onMessage.addListener(handleMessages)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessages)
    }
  }, [])

  const handleDocumentClick = (e) => {
    if (appTarget?.current?.contains(e.target)) return
    setSaveStatus('idle')
  }

  const closePanel = () => {
    setSaveStatus('idle')
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return (
    <div ref={appTarget} id="save-to-pocket-extension">
      <Doorhanger
        saveStatus={saveStatus}
        itemPreview={itemPreview}
        closePanel={closePanel}
      />
    </div>
  )
}
