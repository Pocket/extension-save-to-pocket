import { setToolbarIcon } from 'common/interface'
import { fetchStoredTags, getOnSaveTags } from 'common/api'
import { getSetting, setSettings } from 'common/interface'

import { UPDATE_STORED_TAGS } from 'actions'
import { SUGGESTED_TAGS_SUCCESS } from 'actions'

/* On successful save
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export async function saveSuccess(tabId, payload) {
  // Update toolbar icon
  const { resolved_url, given_url, isLink } = payload
  // fetch image and title from above
  const url = resolved_url || given_url //eslint-disable-line

  if (!isLink) setToolbarIcon(tabId, true)

  // Get list of users tags for typeahead
  getStoredTags(tabId)

  // Premium: Request suggested tags
  getTagSuggestions(url, tabId)
}

/* Get stored tags
–––––––––––––––––––––––––––––––––––––––––––––––––– */
async function getStoredTags(tabId) {
  // Check for server tags
  const fetchedSince = await getSetting('tags_fetched_timestamp') || 0
  const fetchTags = await fetchStoredTags(fetchedSince)
  const fetchedTags = fetchTags ? fetchTags.tags || [] : []
  const tagsFromSettings = await getSetting('tags_stored')
  const parsedTags = (tagsFromSettings) ? JSON.parse(tagsFromSettings) : []
  const tags_stored = [...new Set([].concat(...parsedTags, ...fetchedTags))]
  const tags = JSON.stringify(tags_stored)

  setSettings({
    tags_stored: tags,
    tags_fetched_timestamp: Date.now(),
  })

  chrome.tabs.sendMessage(tabId, {
    action: UPDATE_STORED_TAGS,
    payload: { tags: tags_stored },
  })
}

/* Get suggested tags for premium users
–––––––––––––––––––––––––––––––––––––––––––––––––– */
async function getTagSuggestions(url, tabId) {
  const premiumStatus = await getSetting('premium_status')
  if (premiumStatus !== '1') return

  const response = await getOnSaveTags(url)
  const suggestedTags = response ? response.suggested_tags : []

  if (response) {
    chrome.tabs.sendMessage(tabId, {
      action: SUGGESTED_TAGS_SUCCESS,
      payload: { suggestedTags },
    })
  }
}
