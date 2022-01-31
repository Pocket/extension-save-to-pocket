import * as Sentry from '@sentry/browser'

/* Messaging
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function sendMessage(message) {
  chrome.runtime.sendMessage(message)
}

/* Browser
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function openTabWithUrl(url, inBackground) {
  let makeTabActive = inBackground === true ? false : true //eslint-disable-line no-unneeded-ternary
  return chrome.tabs.create({ url: url, active: makeTabActive })
}

/* Action Iconography
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function setDefaultIcon() {
  const imageData = inactiveIcon()
  chrome.action.setIcon({ imageData })
}

export function setToolbarIcon(tabId, isSaved) {
  const imageData = isSaved ? savedIcon() : inactiveIcon()
  chrome.action.setIcon({ tabId, imageData })
}

export function savedIcon() {
  const canvas = new OffscreenCanvas(32, 32)
  const context = canvas.getContext('2d')
  let saved = new Path2D(
    'M16 31C24.8366 31 32 23.7868 32 14.8889V5.22167C32 3.44208 30.5673 2 28.8 2H3.2C1.43269 2 0 3.43932 0 5.2189V14.8889C0 23.7868 7.16344 31 16 31ZM10.7314 12.1386C10.1065 11.5094 9.09347 11.5094 8.46863 12.1386C7.84379 12.7677 7.84379 13.7878 8.46863 14.417L14.8686 20.8615C15.4935 21.4906 16.5065 21.4906 17.1314 20.8615L23.5314 14.417C24.1562 13.7878 24.1562 12.7677 23.5314 12.1386C22.9065 11.5094 21.8935 11.5094 21.2686 12.1386L16 17.4438L10.7314 12.1386Z',
  )
  context.clearRect(0, 0, 32, 32)
  context.fillStyle = '#EF4056' // Pocket Brand Coral/Red
  context.fill(saved, 'evenodd')
  return context.getImageData(0, 0, 32, 32)
}

export function inactiveIcon() {
  const canvas = new OffscreenCanvas(32, 32)
  const context = canvas.getContext('2d')

  const outer = new Path2D(
    'M0 5.22222C0 3.44264 1.43269 2 3.2 2H28.8C30.5673 2 32 3.44264 32 5.22222H28.8H3.2H0ZM3.2 5.22222H0V14.8889C0 23.7868 7.16344 31 16 31C24.8366 31 32 23.7868 32 14.8889V5.22222H28.8V14.8889C28.8 22.0072 23.0692 27.7778 16 27.7778C8.93075 27.7778 3.2 22.0072 3.2 14.8889V5.22222Z',
  )
  const inner = new Path2D(
    'M8.46863 12.1386C9.09347 11.5094 10.1065 11.5094 10.7314 12.1386L16 17.4438L21.2686 12.1386C21.8935 11.5094 22.9065 11.5094 23.5314 12.1386C24.1562 12.7677 24.1562 13.7878 23.5314 14.417L17.1314 20.8615C16.5065 21.4906 15.4935 21.4906 14.8686 20.8615L8.46863 14.417C7.84379 13.7878 7.84379 12.7677 8.46863 12.1386Z',
  )

  context.clearRect(0, 0, 32, 32)
  context.fillStyle = '#EF4056' // Pocket Brand Coral/Red
  context.fill(outer, 'evenodd')
  context.fill(inner, 'evenodd')
  return context.getImageData(0, 0, 32, 32)
}

/* Local Storage
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getSetting(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) {
        handleSettingError(chrome.runtime.lastError)
        return reject('Error when retrieving local settings')
      }
      resolve(result[key])
    })
  })
}

export function setSettings(values) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(values, () => {
      if (chrome.runtime.lastError) {
        handleSettingError(chrome.runtime.lastError)
        return reject('Error when storing local settings')
      }
      resolve()
    })
  })
}

function handleSettingError(err) {
  console.error(err)

  Sentry.withScope((scope) => {
    scope.setFingerprint('Storage Error')
    Sentry.captureMessage(err)
  })
}
