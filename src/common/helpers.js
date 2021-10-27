import { getSetting } from './interface'

export function isSystemPage(tab) {
  return tab.active && isSystemLink(tab.url)
}

export function isSystemLink(link) {
  return (
    link.startsWith('chrome://') ||
    link.startsWith('chrome-extension://') ||
    link.startsWith('chrome-search://')
  )
}

export async function getAccessToken() {
  return await getSetting('access_token')
}

export function checkDuplicate(list, tagValue) {
  return list.filter((tag) => tag.name === tagValue).length
}

export function closeLoginPage() {
  chrome.tabs.query(
    { url: '*://getpocket.com/extension_login_success*' },
    (tabs) => {
      chrome.tabs.remove(tabs.map((tab) => tab.id))
    },
  )
}

export function deriveItemData(item) {
  return {
    itemId: item?.item_id,
    title: displayTitle(item),
    thumbnail: displayThumbnail(item),
    publisher: displayPublisher(item)
  }
}

/** TITLE
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The most appropriate title to show
 */
 export function displayTitle(item) {
  return (
    item?.title ||
    item?.resolved_title ||
    item?.given_title ||
    item?.display_url ||
    displayPublisher(item) ||
    null
  )
}

/** PUBLISHER
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string} The best text to display as the publisher of this item
 */
 export function displayPublisher(item) {
  const urlToUse = item?.given_url || item?.resolved_url
  const derivedDomain = domainForUrl(urlToUse)
  return (
    item?.domain_metadata?.name ||
    item?.domain ||
    derivedDomain ||
    null
  )
}

/**
 * DOMAIN FOR URL
 * Get the base domain for a given url
 * @param {url} url Url to get domain from
 * @return {string} parsed domain
 */
 export function domainForUrl(url) {
  if (!url) return false
  const match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im)
  return match[1]
}

/** THUMBNAIL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {string:url} The most appropriate image to show as a thumbnail
 */
 export function displayThumbnail(item) {
  return (
    item?.top_image_url ||
    item?.image?.src ||
    item?.images?.[Object.keys(item.images)[0]]?.src ||
    null
  )
}

/**
 * Helper function to figure out what the CSS class name should be based on the
 * mode name that maps to the current OS color mode.
 * @return  {String}  Formatted CSS class name
 */
 export function getOSModeClass() {
  if (!window.matchMedia) return 'light'

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
  const isNotSpecified = window.matchMedia(
    '(prefers-color-scheme: no-preference)'
  ).matches
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified
  let mode

  if (isLightMode) {
    mode = 'light'
  }
  if (isDarkMode) {
    mode = 'dark'
  }
  // fallback if no system setting
  if (isNotSpecified || hasNoSupport) {
    mode = 'light'
  }

  return mode
}
