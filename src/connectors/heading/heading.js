import React, { useEffect, useState } from 'react'
import { Heading } from 'components/heading/heading'

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

import { UPDATE_ITEM_PREVIEW } from 'actions'

export const HeadingConnector = () => {
  const [saveStatus, setSaveStatus] = useState('idle')
  const [itemId, setItemId] = useState(null)

  /* Handle incoming messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const handleMessages = (event) => {
    const { payload, action = 'Unknown Action' } = event || {}

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

      case UPDATE_ITEM_PREVIEW: {
        const { item } = payload
        setItemId(item?.itemId)
        return
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

  useEffect(() => {
    setSaveStatus('saving')
    chrome.runtime.onMessage.addListener(handleMessages)
    return () => chrome.runtime.onMessage.removeListener(handleMessages)
  }, [])

  const removeAction = () => {
    chrome.runtime.sendMessage({
      type: REMOVE_ITEM_REQUEST,
      payload: { itemId }
    })
  }

  return (
    <Heading
      saveStatus={saveStatus}
      removeAction={removeAction}
    />
  )
}
