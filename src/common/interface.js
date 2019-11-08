/* global chrome safari */

/* Utilities
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { isFunction } from './utilities'

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
export function sendMessage(message) {
  if (typeof safari !== 'undefined') {
    return safari.extension.dispatchMessage(message.type, message.payload)
  }

  chrome.runtime.sendMessage(message)
}

export function sendMessageToTab(tabId, message, cb) {
  let callback = isFunction(cb) ? cb : () => {}
  return chrome.tabs.sendMessage(tabId, message, callback)
}

/* Browser
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function cookies() {
  return chrome.cookies
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
  let makeTabActive = inBackground === true ? false : true //eslint-disable-line no-unneeded-ternary
  return chrome.tabs.create({ url: url, active: makeTabActive })
}

export function openOptions() {
  return chrome.runtime.openOptionsPage()
}

export function setToolbarIcon(tabId, iconName) {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  const darkMode = prefersDark ? '-dark' : ''

  const smallIconPath = `images/${iconName}${darkMode}-19.png`
  const bigIconPath = `images/${iconName}${darkMode}-38.png`

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

/* References
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export function getExtensionInfo() {
  return new Promise(resolve => {
    return chrome.management.getSelf(resolve)
  })
}

/* Local Storage
–––––––––––––––––––––––––––––––––––––––––––––––––– */
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
