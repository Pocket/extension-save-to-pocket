import React, { useEffect, useState } from 'react'
import { Heading } from 'components/heading/heading'
import { SAVE_TO_POCKET_REQUEST } from 'actions'
import { SAVE_TO_POCKET_SUCCESS } from 'actions'
import { SAVE_TO_POCKET_FAILURE } from 'actions'
import { REMOVE_ITEM_SUCCESS } from 'actions'
import { REMOVE_ITEM_FAILURE } from 'actions'

export const HeadingConnector = () => {
  const [saveStatus, setSaveStatus] = useState('idle')

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
    return () => chrome.runtime.onMessage.removeListener(handleMessages)
  }, [])

  return (
    <Heading saveStatus={saveStatus} />
  )
}
