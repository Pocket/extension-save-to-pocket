import React, { useState, useEffect, useRef } from 'react'
import { Doorhanger } from 'components/doorhanger/doorhanger'

import { SAVE_TO_POCKET_REQUEST } from 'actions'
import { SAVE_TO_POCKET_SUCCESS } from 'actions'
import { SAVE_TO_POCKET_FAILURE } from 'actions'
import { ARCHIVE_ITEM_SUCCESS } from 'actions'
import { ARCHIVE_ITEM_FAILURE } from 'actions'
import { REMOVE_ITEM_SUCCESS } from 'actions'
import { REMOVE_ITEM_FAILURE } from 'actions'

export const App = () => {
  const appTarget = useRef(null)
  const [saveStatus, setSaveStatus] = useState('idle')
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

      case ARCHIVE_ITEM_SUCCESS: {
        return setSaveStatus('archived')
      }

      case ARCHIVE_ITEM_FAILURE: {
        return setSaveStatus('archive_failed')
      }

      case REMOVE_ITEM_SUCCESS: {
        return setSaveStatus('removed')
      }

      case REMOVE_ITEM_FAILURE: {
        return setSaveStatus('remove_failed')
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

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return (
    <div ref={appTarget}>
      <Doorhanger saveStatus={saveStatus} />
    </div>
  )
}
