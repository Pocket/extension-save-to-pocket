/* global chrome */
import * as handlers from './handlerActions'
import { AUTH_CODE_RECEIVED } from 'actions'
import { USER_LOG_IN } from 'actions'
import { USER_LOG_OUT } from 'actions'
import { LOGGED_OUT_OF_POCKET } from 'actions'
import { ARCHIVE_ITEM_REQUEST } from 'actions'
import { REMOVE_ITEM_REQUEST } from 'actions'
import { TAGS_SYNC } from 'actions'
import { OPEN_POCKET } from 'actions'

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
})

// Browser Action - Toolbar
chrome.browserAction.onClicked.addListener(handlers.browserAction)

// Context Menus - Right/Options Click Menu
chrome.contextMenus.onClicked.addListener(handlers.contextClick)

/* Message Handler
–––––––––––––––––––––––––––––––––––––––––––––––––– */
chrome.runtime.onMessage.addListener(function(message, sender) {
  const { type, payload } = message
  const { tab } = sender

  switch (type) {
    case AUTH_CODE_RECEIVED:
      handlers.authCodeRecieved(tab, payload)
      return

    case USER_LOG_IN:
      handlers.logIn(tab)
      return

    case USER_LOG_OUT:
      handlers.logOut(tab)
      return

    case LOGGED_OUT_OF_POCKET:
      handlers.logOut(tab)
      return

    case ARCHIVE_ITEM_REQUEST:
      handlers.archiveItemAction(tab, payload)
      return

    case REMOVE_ITEM_REQUEST:
      handlers.removeItemAction(tab, payload)
      return

    case TAGS_SYNC:
      handlers.tagsSyncAction(tab, payload)
      return

    case OPEN_POCKET:
      handlers.openPocket()
      return

    default:
      return
  }
})
