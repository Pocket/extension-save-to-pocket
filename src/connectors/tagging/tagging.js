import React, { useState, useEffect } from 'react'
import { getSetting } from 'common/interface'
import { checkDuplicate } from 'common/helpers'
import { Tagging } from 'components/tagging/tagging'

import { UPDATE_STORED_TAGS } from 'actions'
import { SUGGESTED_TAGS_SUCCESS } from 'actions'
import { UPDATE_ITEM_PREVIEW } from 'actions'
import { TAGS_SYNC } from 'actions'

export const TaggingConnector = ({ closePanel }) => {
  const [storedTags, setStoredTags] = useState([])
  const [suggestedTags, setSuggestedTags] = useState([])
  const [usedTags, setUsedTags] = useState([])
  const [markedTags, setMarkedTags] = useState([])
  const [itemId, setItemId] = useState(null)

  useEffect(async () => {
    const storedTagsString = await getSetting('tags_stored')
    const storedTagsDraft = (storedTagsString) ? JSON.parse(storedTagsString) : []
    setStoredTags(storedTagsDraft)
  }, [])

  /* Handle incoming messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const handleMessages = (event) => {
    const { payload, action = 'Unknown Action' } = event || {}

    switch (action) {
      case UPDATE_STORED_TAGS: {
        const { tags } = payload
        return setStoredTags(tags)
      }

      case SUGGESTED_TAGS_SUCCESS: {
        const { suggestedTags } = payload
        return setSuggestedTags(suggestedTags)
      }

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

  const submitChanges = (usedDraft) => {
    const usedSuggested = usedDraft.filter(usedTag => suggestedTags.includes(usedTag))
    const payload = {
      item_id: itemId,
      tags: usedDraft,
      suggestedCount: suggestedTags.length,
      usedSuggestedCount: usedSuggested
    }

    chrome.runtime.sendMessage({
      type: TAGS_SYNC,
      payload
    })
  }

  const addTag = ({ value }) => {
    if (checkDuplicate(usedTags, value)) return
    const usedDraft = [ ...usedTags, value ]
    setUsedTags(usedDraft)
    submitChanges(usedDraft)
  }

  const activateTag = ({ tag }) => {
    // No Tag has been passed in so use the last used tag
    const tagValue = tag ? tag : usedTags[usedTags.length - 1]
    const isMarked = checkDuplicate(markedTags, tagValue) > 0
    const marked = isMarked ? markedTags : [...markedTags, tagValue]

    setMarkedTags(marked)
  }

  const deactivateTag = ({ tag }) => {
    const marked = markedTags.filter(item => item !== tag)
    setMarkedTags(marked)
  }

  const deactivateTags = () => {
    setMarkedTags([])
  }

  const removeTag = ({ tag }) => {
    const usedDraft = usedTags.filter(item => item !== tag)
    setUsedTags(usedDraft)
    submitChanges(usedDraft)
  }

  const removeTags = () => {
    if (!markedTags.length) return
    const usedDraft = usedTags.filter(tag => !markedTags.includes(tag))
    setUsedTags(usedDraft)
    setMarkedTags([])
    submitChanges(usedDraft)
  }

  return (
    <Tagging
      usedTags={usedTags}
      markedTags={markedTags}
      suggestedTags={suggestedTags}
      storedTags={storedTags}
      addTag={addTag}
      activateTag={activateTag}
      deactivateTag={deactivateTag}
      deactivateTags={deactivateTags}
      removeTag={removeTag}
      removeTags={removeTags}
      closePanel={closePanel}
    />
  )
}
