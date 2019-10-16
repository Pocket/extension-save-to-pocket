/* global chrome */

import { setSettings } from 'common/helpers'

export function initColorMode() {
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  setColorMode(null, { darkMode })
}

export function setColorMode(tab, { darkMode }) {
  setSettings({ darkMode })
  updateToolbarIconMode(darkMode)
}

function updateToolbarIconMode(darkMode) {
  const iconName = `browser-action-icon${darkMode ? '-dark' : ''}`
  const smallIconPath = `images/${iconName}-19.png`
  const bigIconPath = `images/${iconName}-38.png`

  // Set all icons
  chrome.browserAction.setIcon({
    path: {
      '19': smallIconPath,
      '38': bigIconPath
    }
  })
}
