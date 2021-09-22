/* global chrome */
import { updateToolbarIcon } from 'common/interface'
import { fetchStoredTags, getOnSaveTags } from 'common/api'
import { getSetting, setSettings } from 'common/helpers'

import { UPDATE_STORED_TAGS } from 'actions'
import { SUGGESTED_TAGS_SUCCESS } from 'actions'

/* On successful save
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export async function saveSuccess(tabId, payload) {
  // Update toolbar icon
  const { resolved_url, given_url, isLink, resolved_id } = payload
  const url = resolved_url || given_url

  if (!isLink) updateToolbarIcon(tabId, true)

  // Get list of users tags for typeahead
  getStoredTags(tabId)

  // Premium: Request suggested tags
  getTagSuggestions(url, tabId)
}

/* Get stored tags
–––––––––––––––––––––––––––––––––––––––––––––––––– */
async function getStoredTags(tabId) {
  // Check for server tags
  const fetchedSince = getSetting('tags_fetched_timestamp') || 0
  const fetchTags = await fetchStoredTags(fetchedSince)
  const fetchedTags = fetchTags ? fetchTags.tags || [] : []
  const parsedTags = JSON.parse(getSetting('tags_stored')) || []
  const tags_stored = [...new Set([].concat(...parsedTags, ...fetchedTags))]
  const tags = JSON.stringify(tags_stored)

  setSettings({
    tags_stored: tags,
    tags_fetched_timestamp: Date.now()
  })

  chrome.tabs.sendMessage(tabId, {
    action: UPDATE_STORED_TAGS,
    payload: { response: { tags: tags_stored } }
  })
}

/* Get suggested tags for premium users
–––––––––––––––––––––––––––––––––––––––––––––––––– */
async function getTagSuggestions(url, tabId) {
  if (getSetting('premium_status') !== '1') return

  const response = await getOnSaveTags({ url })

  if (response) {
    chrome.tabs.sendMessage(tabId, {
      action: SUGGESTED_TAGS_SUCCESS,
      payload: { response }
    })
  }
}
