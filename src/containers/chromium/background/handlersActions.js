/* global chrome */
import { saveSuccess } from './handlersPostSave'
import { openPocket, isSystemPage, isSystemLink } from 'common/helpers'
import { getSetting, setSettings, removeSettings } from 'common/helpers'
import { closeLoginPage } from 'common/helpers'
import { updateToolbarIcon } from 'common/interface'
import { authorize, getGuid, saveToPocket, syncItemTags } from 'common/api'
import { removeItem, archiveItem } from 'common/api'

import { AUTH_URL } from 'common/constants'

import { SAVE_TO_POCKET_REQUEST } from 'actions'
import { SAVE_TO_POCKET_SUCCESS } from 'actions'
import { SAVE_TO_POCKET_FAILURE } from 'actions'

import { TAG_SYNC_REQUEST } from 'actions'
import { TAG_SYNC_SUCCESS } from 'actions'
import { TAG_SYNC_FAILURE } from 'actions'

import { ARCHIVE_ITEM_REQUEST } from 'actions'
import { ARCHIVE_ITEM_SUCCESS } from 'actions'
import { ARCHIVE_ITEM_FAILURE } from 'actions'

import { REMOVE_ITEM_REQUEST } from 'actions'
import { REMOVE_ITEM_SUCCESS } from 'actions'
import { REMOVE_ITEM_FAILURE } from 'actions'
import { USER_LOG_OUT_SUCCESS } from 'actions'

var postAuthSave = null

/* Browser Action - Toolbar Icon Clicked
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function browserAction(tab) {
  if (isSystemPage(tab)) return openPocket() // open list on non-standard pages

  const { id: tabId, title, url: pageUrl } = tab

  save({ pageUrl, title, tabId })
}

/* Context Clicks - Right/Option Click Menus
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function contextClick(info, tab) {
  const { menuItemId, linkUrl, pageUrl } = info
  const { id: tabId, title } = tab

  if (menuItemId === 'toolbarContextClick') return openPocket()

  // Open list on non-standard pages/links
  if (isSystemLink(linkUrl || pageUrl)) return openPocket()

  return save({ linkUrl, pageUrl, title, tabId })
}

/* Saving
–––––––––––––––––––––––––––––––––––––––––––––––––– */
async function save({ linkUrl, pageUrl, title, tabId }) {
  // Are we authed?
  const access_token = getSetting('access_token')
  if (!access_token) return logIn({ linkUrl, pageUrl, title, tabId })

  // send message that we are requesting a save
  chrome.tabs.sendMessage(tabId, { action: SAVE_TO_POCKET_REQUEST })

  const url = linkUrl || pageUrl
  const { response: payload } = await saveToPocket({ url, title, tabId })

  // send a message with the response
  const message = payload
    ? { action: SAVE_TO_POCKET_SUCCESS, payload }
    : { action: SAVE_TO_POCKET_FAILURE, payload }

  chrome.tabs.sendMessage(tabId, message)

  if (payload) saveSuccess(tabId, { ...payload, isLink: Boolean(linkUrl) })
}

/* Archive item
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export async function archiveItemAction(tab, payload) {
  const { id: tabId } = tab
  const { item_id, ...actionInfo } = payload

  // send message that we are attempting to sync tags
  chrome.tabs.sendMessage(tabId, { action: ARCHIVE_ITEM_REQUEST })

  const { response } = await archiveItem(item_id, actionInfo)
  const message = response
    ? { action: ARCHIVE_ITEM_SUCCESS, payload }
    : { action: ARCHIVE_ITEM_FAILURE, payload }

  chrome.tabs.sendMessage(tabId, message)
}

/* Remove item
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export async function removeItemAction(tab, payload) {
  const { id: tabId } = tab
  const { item_id, ...actionInfo } = payload

  // send message that we are attempting to sync tags
  chrome.tabs.sendMessage(tabId, { action: REMOVE_ITEM_REQUEST })

  const { response } = await removeItem(item_id, actionInfo)
  const message = response
    ? { action: REMOVE_ITEM_SUCCESS, payload }
    : { action: REMOVE_ITEM_FAILURE, payload }

  chrome.tabs.sendMessage(tabId, message)

  if (response) updateToolbarIcon(tabId, false)
}

/* Add tags to item
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export async function tagsSyncAction(tab, payload) {
  const { id: tabId } = tab
  const { item_id, tags, ...actionInfo } = payload

  // send message that we are attempting to sync tags
  chrome.tabs.sendMessage(tabId, { action: TAG_SYNC_REQUEST })

  const { response } = await syncItemTags(item_id, tags, actionInfo)
  const message = response
    ? { action: TAG_SYNC_SUCCESS, payload }
    : { action: TAG_SYNC_FAILURE, payload }

  chrome.tabs.sendMessage(tabId, message)
}

/* Authentication user
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export async function authCodeRecieved(tab, payload) {
  const guidResponse = await getGuid()
  const authResponse = await authorize(guidResponse, payload)

  const { access_token, account, username } = authResponse
  const { premium_status } = account
  setSettings({ access_token, premium_status, username })

  closeLoginPage()
  if (postAuthSave) save(postAuthSave)
}

export function logOut(tab) {
  const { id: tabId } = tab
  removeSettings(['access_token'])

  chrome.tabs.sendMessage(tabId, { action: USER_LOG_OUT_SUCCESS })
}

export function logIn(saveObject) {
  postAuthSave = saveObject
  window.open(AUTH_URL)
}

export { openPocket }

/* Tab Changes
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function tabUpdated(tabId, changeInfo) {
  if (changeInfo.status === 'loading' && changeInfo.url) {
    // if actively loading a new page, unset save state on icon
    updateToolbarIcon(tabId, false)
  }
}

// export function tabActivated({ tabId, windowId }) {}
