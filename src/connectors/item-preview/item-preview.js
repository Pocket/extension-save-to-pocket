import React, { useState, useEffect } from 'react'
import { ItemPreview } from 'components/item-preview/item-preview'
import { UPDATE_ITEM_PREVIEW } from 'actions'

export const ItemPreviewConnector = () => {
  const [itemPreview, setItemPreview] = useState({})

  /* Handle incoming messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const handleMessages = (event) => {
    const { payload, action = 'Unknown Action' } = event || {}

    switch (action) {
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
    chrome.runtime.onMessage.addListener(handleMessages)
    return () => chrome.runtime.onMessage.removeListener(handleMessages)
  }, [])

  return (
    <ItemPreview {...itemPreview} />
  )
}
