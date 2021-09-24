import { getSetting, setSettings } from 'common/helpers'
import { getBool } from 'common/utilities'
import { saveToPocket } from 'common/api'

import { START_TWITTER_INTEGRATION } from 'actions'
import { STOP_TWITTER_INTEGRATION } from 'actions'
import { TWITTER_SAVE_SUCCESS } from 'actions'
import { TWITTER_SAVE_FAILURE } from 'actions'

export function checkTwitterIntegration(tab) {
  const { id: tabId } = tab

  var twitterIntegration = getSetting('sites_twitter')
  if (twitterIntegration === null) {
    setSettings({ sites_twitter: true })
    twitterIntegration = true
  }

  // send a message with the response
  const message = getBool(twitterIntegration)
    ? { action: START_TWITTER_INTEGRATION }
    : { action: STOP_TWITTER_INTEGRATION }

  chrome.tabs.sendMessage(tabId, message)
}

export async function twitterSaveRequest(tab, payload) {
  const { permaLink: url, title = false } = payload
  const { id: tabId } = tab

  const response = await saveToPocket({ url, title, tabId })

  // send a message with the response
  const message = response
    ? { action: TWITTER_SAVE_SUCCESS, payload }
    : { action: TWITTER_SAVE_FAILURE, payload }

  chrome.tabs.sendMessage(tabId, message)
}
