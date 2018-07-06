/* Utilities
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { isFunction } from './utilities'

const chrome = window.chrome

/* Listeners Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function addMessageListener(handler) {
  return chrome.runtime.onMessage.addListener(handler)
}

export function removeMessageListener(handler) {
  return chrome.runtime.onMessage.removeListener(handler)
}

export function onUpdateAvailable(handler) {
  return chrome.runtime.onUpdateAvailable.addListener(handler)
}

export function reloadExtension() {
  return chrome.runtime.reload()
}

export function onInstalled() {
  return chrome.runtime.onInstalled
}

export function setUninstallUrl(url) {
  return chrome.runtime.setUninstallURL(url)
}

export function onSuspend() {
  return chrome.runtime.onSuspend
}

export function onTabActivated(callback) {
  return chrome.tabs.onActivated.addListener(callback)
}

export function onTabUpdate(callback) {
  return chrome.tabs.onUpdated.addListener(callback)
}

export function onTabCreated(callback) {
  return chrome.tabs.onCreated.addListener(callback)
}

export function onTabRemoved(callback) {
  return chrome.tabs.onRemoved.addListener(callback)
}

export function onTabReplaced(callback) {
  return chrome.tabs.onReplaced.addListener(callback)
}

export function onFocusChanged(callback) {
  return chrome.windows.onFocusChanged.addListener(callback)
}
/* Messaging
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function sendMessage(extensionId = null, message, cb) {
  let callback = isFunction(cb) ? cb : () => {}
  return chrome.runtime.sendMessage(message, callback)
}

export function sendMessageToTab(tabId, message, cb) {
  let callback = isFunction(cb) ? cb : () => {}
  return chrome.tabs.sendMessage(tabId, message, callback)
}

export function sendMessageToAllTabs(msg) {
  getAllTabs(function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      sendMessageToTab(tabs[i].id, msg)
    }
  })
}

export function connect(extensionId, connectObject) {
  return chrome.runtime.connect(
    extensionId,
    connectObject
  )
}

export function onConnect(handler) {
  chrome.runtime.onConnect.addListener(handler)
}

/* Bookmarks
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function bookmark(id) {
  return new Promise(resolve => {
    chrome.bookmarks.get(id, resolve)
  })
}

export function bookmarks() {
  return new Promise(resolve => {
    chrome.bookmarks.getTree(resolve)
  })
}

export function bookmarksAll(id) {
  return new Promise(resolve => {
    chrome.bookmarks.getTree(id, resolve)
  })
}

export function bookmarksChildren(id) {
  return new Promise(resolve => {
    chrome.bookmarks.getChildren(id, resolve)
  })
}

export function onBookmarkUpdated(callback) {
  chrome.bookmarks.onCreated.addListener(callback)
  chrome.bookmarks.onRemoved.addListener(callback)
  chrome.bookmarks.onChanged.addListener(callback)
  chrome.bookmarks.onMoved.addListener(callback)
  chrome.bookmarks.onChildrenReordered.addListener(callback)
  chrome.bookmarks.onImportEnded.addListener(callback)
}

/* Browser
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function browserAction() {
  return chrome.browserAction
}
export function contextMenus() {
  return chrome.contextMenus
}
export function cookies() {
  return chrome.cookies
}

export function getTopSites() {
  return new Promise(resolve => {
    chrome.topSites.get(resolve)
  })
}

export function checkPermission(permissions) {
  return new Promise(resolve => {
    chrome.permissions.contains({ permissions }, resolve)
  })
}

export function requestPermission(permissions) {
  return new Promise(resolve => {
    chrome.permissions.request({ permissions }, resolve)
  })
}

export function removePermission(permissions) {
  return new Promise(resolve => {
    chrome.permissions.remove({ permissions }, resolve)
  })
}

export function getURL(url) {
  return chrome.runtime.getURL(url)
}

export function openUrl(url) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tab) {
    chrome.tabs.update(tab[0].id, { url })
  })
}

export function openTabWithUrl(url, inBackground) {
  let makeTabActive = inBackground === true ? false : true
  return chrome.tabs.create({ url, active: makeTabActive })
}

export function openTab() {
  chrome.tabs.create({})
}

export function openOptions() {
  return chrome.runtime.openOptionsPage()
}

export function activePrivateMode(tab) {
  return tab.incognito
}

export function setToolbarIcon(tabId, iconName) {
  const smallIconPath = `images/${iconName}-19.png`
  const bigIconPath = `images/${iconName}-38.png`
  chrome.browserAction.setIcon({
    tabId,
    path: {
      '19': smallIconPath,
      '38': bigIconPath
    }
  })
}

export function updateToolbarIcon(tabId, activateIcon) {
  activateIcon
    ? setToolbarIcon(tabId, 'browser-action-icon-added')
    : setToolbarIcon(tabId, 'browser-action-icon')
}

export function executeScript(tabId, scriptObject, cb) {
  let callback = isFunction(cb) ? cb : () => {}
  return chrome.tabs.executeScript(tabId, scriptObject, callback)
}
/* References
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export function getExtensionInfo() {
  return new Promise(resolve => {
    return chrome.management.getSelf(resolve)
  })
}

export function getBackgroundPage() {
  return chrome.extension.getBackgroundPage()
}

export function getCurrentTab(cb) {
  let callback = isFunction(cb) ? cb : () => {}
  return chrome.tabs.query(
    {
      windowId: chrome.windows.WINDOW_ID_CURRENT,
      active: true
    },
    function(tab) {
      callback(tab)
    }
  )
}

export function getAllTabs(cb) {
  let callback = isFunction(cb) ? cb : () => {}
  return chrome.tabs.query({}, callback)
}

export function getPath(path) {
  return window.chrome.runtime.getURL(path)
}

export function queryTabs(queryObject, cb) {
  let callback = isFunction(cb) ? cb : () => {}
  return chrome.tabs.query(queryObject, callback)
}

export function closeTabs(tabIDs) {
  return chrome.tabs.remove(tabIDs)
}

export function getVersion() {
  const manifestData = chrome.runtime.getManifest()
  return manifestData.version
}

/* Commands
-------------------------------------------------- */
export function getCommands() {
  return new Promise(resolve => {
    chrome.commands.getAll(resolve)
  })
}

/* Local Storage
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function storage() {
  return chrome.storage.local
}

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
