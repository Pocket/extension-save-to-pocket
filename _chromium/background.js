/* global chrome */
import * as handle from './handlersActions'
import { initColorMode, setColorMode } from './handlersSettings'
import { saveRec, openRec } from './handlersPostSave'
import { checkTwitterIntegration } from './handlersIntegration'
import { twitterSaveRequest } from './handlersIntegration'

import { AUTH_CODE_RECEIVED } from 'actions'
import { USER_LOG_IN } from 'actions'
import { USER_LOG_OUT } from 'actions'
import { LOGGED_OUT_OF_POCKET } from 'actions'
import { ARCHIVE_ITEM_REQUEST } from 'actions'
import { REMOVE_ITEM_REQUEST } from 'actions'
import { TAGS_SYNC } from 'actions'
import { OPEN_POCKET } from 'actions'
import { SAVE_REC_REQUEST } from 'actions'
import { COLOR_MODE_CHANGE } from 'actions'
import { OPEN_REC } from 'actions'
import { CHECK_TWITTER_INTEGRATION } from 'actions'
import { TWITTER_SAVE_REQUEST } from 'actions'

/* Initial Setup
–––––––––––––––––––––––––––––––––––––––––––––––––– */
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: 'Open Your Pocket List',
    id: 'toolbarContextClick',
    contexts: ['browser_action']
  })

  chrome.contextMenus.create({
    title: 'Log Out',
    id: 'toolbarContextClickLogOut',
    contexts: ['browser_action']
  })

  // Page Context - Right click menu on page
  chrome.contextMenus.create({
    title: 'Save To Pocket',
    id: 'pageContextClick',
    contexts: ['page', 'frame', 'editable', 'image', 'video', 'audio', 'link', 'selection'] // prettier-ignore
  })

  // Update toolbar button for prefered dark/light mode
  initColorMode()
})

// Browser Action - Toolbar
chrome.browserAction.onClicked.addListener(handle.browserAction)

// Context Menus - Right/Options Click Menu
chrome.contextMenus.onClicked.addListener(handle.contextClick)

/* Tab Handling
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// Update the icon to unsaved if we are change pages
chrome.tabs.onUpdated.addListener(handle.tabUpdated)

/* Message Handler
–––––––––––––––––––––––––––––––––––––––––––––––––– */
chrome.runtime.onMessage.addListener(function(message, sender) {
  const { type, payload } = message
  const { tab } = sender

  console.groupCollapsed(`RECEIVE: ${type}`)
  console.log(message)
  console.groupEnd(`RECEIVE: ${type}`)

  switch (type) {
    case COLOR_MODE_CHANGE:
      setColorMode(tab, payload)
      return

    case AUTH_CODE_RECEIVED:
      handle.authCodeRecieved(tab, payload)
      return

    case USER_LOG_IN:
      handle.logIn(tab)
      return

    case USER_LOG_OUT:
      handle.logOut(tab)
      return

    case LOGGED_OUT_OF_POCKET:
      handle.loggedOutOfPocket(tab)
      return

    case ARCHIVE_ITEM_REQUEST:
      handle.archiveItemAction(tab, payload)
      return

    case REMOVE_ITEM_REQUEST:
      handle.removeItemAction(tab, payload)
      return

    case TAGS_SYNC:
      handle.tagsSyncAction(tab, payload)
      return

    case OPEN_POCKET:
      handle.openPocket()
      return

    case SAVE_REC_REQUEST:
      saveRec(tab, payload)
      return

    case OPEN_REC:
      openRec(tab, payload)
      return

    case CHECK_TWITTER_INTEGRATION:
      checkTwitterIntegration(tab, payload)
      return

    case TWITTER_SAVE_REQUEST:
      twitterSaveRequest(tab, payload)
      return

    default:
      return
  }
})
