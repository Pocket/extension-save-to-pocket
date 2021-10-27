import React, { useEffect, useState } from 'react'
import { Heading } from 'components/heading/heading'

import { REMOVE_ITEM } from 'actions'
import { RESAVE_ITEM } from 'actions'
import { UPDATE_ITEM_PREVIEW } from 'actions'

export const HeadingConnector = ({ saveStatus }) => {
  const [itemId, setItemId] = useState(null)

  /* Handle incoming messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const handleMessages = (event) => {
    const { payload, action = 'Unknown Action' } = event || {}

    switch (action) {
      case UPDATE_ITEM_PREVIEW: {
        const { item } = payload
        setItemId(item?.itemId)
        return
      }

      default: {
        return
      }
    }
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages)
    return () => chrome.runtime.onMessage.removeListener(handleMessages)
  }, [])

  const removeAction = () => {
    chrome.runtime.sendMessage({
      type: REMOVE_ITEM,
      payload: { itemId }
    })
  }

  const saveAction = () => {
    chrome.runtime.sendMessage({
      type: RESAVE_ITEM
    })
  }

  return (
    <Heading
      saveStatus={saveStatus}
      removeAction={removeAction}
      saveAction={saveAction}
    />
  )
}
