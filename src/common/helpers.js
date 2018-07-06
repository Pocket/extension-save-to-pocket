import { getSetting, setSettings, openUrl } from './interface'
import { shallowQueryParams } from './utilities'

export function openPocket() {
  openUrl(getBaseUrl())
}

export function isNewTab(tab) {
  return tab.active && tab.url === 'chrome://newtab/'
}

export function isSystemPage(tab) {
  return (
    tab.active &&
    (tab.url.startsWith('chrome://') ||
      tab.url.startsWith('chrome-extension://'))
  )
}

export function getBaseUrl() {
  const baseURLSetting = getSetting('base_URL')
  if (!baseURLSetting) setSettings({ base_URL: 'https://getpocket.com/' })
  return baseURLSetting || 'https://getpocket.com/'
}

export function getAPIVersion() {
  const APISetting = getSetting('base_api_version')
  if (!APISetting) setSettings({ base_api_version: 'v3/' })
  return APISetting || 'v3/'
}

export function getAPIUrl() {
  return getBaseUrl() + getAPIVersion()
}

export function getSlug(url) {
  const match = url.match(/^(?:https:\/\/getpocket.com\/explore\/)(.+[^/])/i)
  return match[1]
}

export function getAccessToken() {
  return getSetting('oauth_token')
}

export function isAuthorized() {
  return (
    typeof getSetting('username') !== 'undefined' &&
    typeof getSetting('oauth_token') !== 'undefined'
  )
}

export function isMac() {
  return navigator.platform.match(/^Mac/) !== null
}

export function getCurrentLanguageCode() {
  var language = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage

  language = typeof language !== 'undefined' ? language.toLowerCase() : 'en'

  if (language.indexOf('en') === 0) return 'en' // English
  if (language.indexOf('de') === 0) return 'de' // German
  if (language.indexOf('fr') === 0) return 'fr' // French
  if (language.indexOf('it') === 0) return 'it' // Italian
  if (language.indexOf('es_419') === 0) return 'es_419' // Spanish (Latin America and Caribbean)
  if (language.indexOf('es') === 0) return 'es' // Spanish
  if (language.indexOf('ja') === 0) return 'ja' // Japanese
  if (language.indexOf('ru') === 0) return 'ru' // Russian
  if (language.indexOf('ko') === 0) return 'ko' // Korean
  if (language.indexOf('nl') === 0) return 'nl' // Dutch
  if (language.indexOf('pl') === 0) return 'pl' // Polish
  if (language.indexOf('pt_BR') === 0) return 'pt_BR' // Portuguese Brazil
  if (language.indexOf('pt_PT') === 0) return 'pt_PT' // Portuguese Portugal
  if (language.indexOf('zh_CN') === 0) return 'zh_CN' // Chinese Simplified
  if (language.indexOf('zh_TW') === 0) return 'zh_TW' // Chinese Traditional
  return 'en' // Default is English
}

export function getDefaultKeyboardShortCut() {
  return isMac()
    ? `${String.fromCharCode('8984')}+${String.fromCharCode('8679')}+P`
    : 'ctrl+shift+S'
}

export function getBestImage(item) {
  return item.images[Object.keys(item.images)[0]]
    ? item.images[Object.keys(item.images)[0]].src
    : item.top_image_url
}

export function getImageCacheUrl(url, resize, fallback) {
  if (!url) return

  const query = { url }
  if (resize) query.resize = resize
  if (fallback) query.f = fallback
  // return 'https://img.readitlater.com/direct?' + shallowQueryParams(query)
  return (
    'https://d33ypg4xwx0n86.cloudfront.net/direct?' + shallowQueryParams(query)
  )
}

export function getItemPosition(item) {
  return item.offsetLeft - item.scrollLeft + item.clientLeft + item.offsetWidth
}

export function syncStateAndSettings(values) {
  return Object.keys(values).reduce((obj, key) => {
    return {
      ...obj,
      [key]: getSetting(key) || values[key]
    }
  }, {})
}
