/* Utilities
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { isFunction } from './utilities'

/* Listeners Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function addMessageListener(handler) {}

export function removeMessageListener(handler) {}

export function onUpdateAvailable(handler) {}

export function reloadExtension() {}

export function onInstalled() {}

export function setUninstallUrl(url) {}

export function onSuspend() {}

export function onTabActivated(callback) {}

export function onTabUpdate(callback) {}

export function onTabCreated(callback) {}

export function onTabRemoved(callback) {}

export function onTabReplaced(callback) {}

export function onFocusChanged(callback) {}
/* Messaging
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function sendMessage(extensionId = null, message, cb) {}

export function sendMessageToTab(tabId, message, cb) {}

export function sendMessageToAllTabs(msg) {
  getAllTabs(function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      sendMessageToTab(tabs[i].id, msg)
    }
  })
}

export function connect(extensionId, connectObject) {}

export function onConnect(handler) {}

/* Bookmarks
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function bookmark(id) {
  return new Promise(resolve => {})
}

export function bookmarks() {
  return new Promise(resolve => {})
}

export function bookmarksAll(id) {
  return new Promise(resolve => {})
}

export function bookmarksChildren(id) {
  return new Promise(resolve => {})
}

export function onBookmarkUpdated(callback) {}

/* Browser
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function browserAction() {}
export function contextMenus() {}
export function cookies() {
  // TODO: we need api for getting cookies from swift
  return {
    get({ url, name }, cb) {
      console.log('asking for cookie', { url, name })
      const hardcodedCookies = {
        sess_guid: {
          domain: 'getpocket.com',
          expirationDate: 2038829458.822837,
          hostOnly: true,
          httpOnly: true,
          name: 'sess_guid',
          path: '/',
          sameSite: 'unspecified',
          secure: true,
          session: false,
          storeId: '0',
          value:
            '700d0p76T3626Gn4a9A168aa8bg9T7111d2P21c4dSu40gv25f611JX5a89Kl271'
        }
      }
      cb(hardcodedCookies[name])
    }
  }
}

export function getTopSites() {
  return new Promise(resolve => {})
}

export function checkPermission(permissions) {
  return new Promise(resolve => {})
}

export function requestPermission(permissions) {
  return new Promise(resolve => {})
}

export function removePermission(permissions) {
  return new Promise(resolve => {})
}

export function getURL(url) {}

export function openUrl(url) {}

export function openTabWithUrl(url, inBackground) {}

export function openTab() {}

export function openOptions() {}

export function activePrivateMode(tab) {
  return tab.incognito
}

export function setToolbarIcon(tabId, iconName) {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  const darkMode = prefersDark ? '-dark' : ''

  const smallIconPath = `images/${iconName}${darkMode}-19.png`
  const bigIconPath = `images/${iconName}${darkMode}-38.png`
}

export function updateToolbarIcon(tabId, activateIcon) {
  activateIcon
    ? setToolbarIcon(tabId, 'browser-action-icon-added')
    : setToolbarIcon(tabId, 'browser-action-icon')
}

export function executeScript(tabId, scriptObject, cb) {}
/* References
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export function getExtensionInfo() {
  return new Promise(resolve => {})
}

export function getBackgroundPage() {}

export function getCurrentTab(cb) {
  let callback = isFunction(cb) ? cb : () => {}
}

export function getAllTabs(cb) {
  let callback = isFunction(cb) ? cb : () => {}
}

export function getPath(path) {}

export function queryTabs(queryObject, cb) {
  let callback = isFunction(cb) ? cb : () => {}
}

export function closeTabs(tabIDs) {}

export function getVersion() {}

/* Commands
-------------------------------------------------- */
export function getCommands() {
  return new Promise(resolve => {})
}

/* Local Storage
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function storage() {}

export function getSetting(key) {
  return localStorage.getItem(key)
}

export function setSettings(values) {
  Object.keys(values).forEach(function(key) {
    localStorage.setItem(key, values[key])
  })
}

export function removeSettings(values) {
  values.forEach(function(key) {
    localStorage.removeItem(key)
  })
}
