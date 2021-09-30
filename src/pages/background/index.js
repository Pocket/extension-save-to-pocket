import * as handle from './userActions'
import { setDefaultIcon } from 'common/interface'

import { AUTH_CODE_RECEIVED } from 'actions'
import { USER_LOG_IN } from 'actions'
import { USER_LOG_OUT } from 'actions'
import { LOGGED_OUT_OF_POCKET } from 'actions'
// import { ARCHIVE_ITEM_REQUEST } from 'actions'
import { REMOVE_ITEM_REQUEST } from 'actions'
import { TAGS_SYNC } from 'actions'
import { OPEN_POCKET } from 'actions'
import { COLOR_MODE_CHANGE } from 'actions'
import { CHECK_TWITTER_INTEGRATION } from 'actions'
import { TWITTER_SAVE_REQUEST } from 'actions'
import { TOGGLE_TWITTER } from 'actions'

/* Initial Setup
–––––––––––––––––––––––––––––––––––––––––––––––––– */
chrome.runtime.onInstalled.addListener(function () {
  // Use SVG icons over the png for more control
  setDefaultIcon()

  chrome.contextMenus.create({
    title: 'Open Your Pocket List',
    id: 'toolbarContextClickList',
    contexts: ['action'],
  })

  chrome.contextMenus.create({
    title: 'Discover more at Pocket',
    id: 'toolbarContextClickHome',
    contexts: ['action'],
  })

  chrome.contextMenus.create({
    title: 'Log Out',
    id: 'toolbarContextClickLogOut',
    contexts: ['action'],
  })

  // Page Context - Right click menu on page
  chrome.contextMenus.create({
    title: 'Save To Pocket',
    id: 'pageContextClick',
    contexts: ['page', 'frame', 'editable', 'image', 'video', 'audio', 'link', 'selection'], // prettier-ignore
  })

  // Update toolbar button for preferred dark/light mode
  // initColorMode()

  // Set up defaults
  // initOptions()
})

/* Browser Action - Toolbar
–––––––––––––––––––––––––––––––––––––––––––––––––– */
chrome.action.onClicked.addListener(handle.browserAction)

/* Context Menus Handling
–––––––––––––––––––––––––––––––––––––––––––––––––– */
chrome.contextMenus.onClicked.addListener(handle.contextClick)

/* Tab Handling
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// Update the icon to unsaved if we are change pages
chrome.tabs.onUpdated.addListener(handle.tabUpdated)

chrome.runtime.onMessage.addListener(function (message, sender) {
  const { type, payload } = message
  const { tab } = sender

  console.groupCollapsed(`RECEIVE: ${type}`)
  console.log(message)
  console.groupEnd(`RECEIVE: ${type}`)

  switch (type) {
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
    // case ARCHIVE_ITEM_REQUEST:
      // handle.archiveItemAction(tab, payload)
      // return
    case REMOVE_ITEM_REQUEST:
      // handle.removeItemAction(tab, payload)
      return
    case TAGS_SYNC:
      handle.tagsSyncAction(tab, payload)
      return
    case COLOR_MODE_CHANGE:
      // setColorMode(tab, payload)
      return
    case TOGGLE_TWITTER:
      // setTwitter(tab, payload)
      return
    case OPEN_POCKET:
      handle.openPocket()
      return
    case CHECK_TWITTER_INTEGRATION:
      // checkTwitterIntegration(tab, payload)
      return
    case TWITTER_SAVE_REQUEST:
      // twitterSaveRequest(tab, payload)
      return
    default:
      return
  }
})