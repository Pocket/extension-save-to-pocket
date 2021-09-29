import { getSetting, setSettings } from 'common/helpers'
import { setDefaultIcon } from 'common/interface'

export function initColorMode() {
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  setColorMode(null, { darkMode })
}

export async function setColorMode(tab, { darkMode }) {
  await setSettings({ darkMode })
  setDefaultIcon()
}

export async function initOptions() {
  const twitterEnabled = (await getSetting('sites_twitter')) || 'unset'
  if (twitterEnabled === 'unset') {
    await setSettings({ sites_twitter: true })
  }
}

export async function setTwitter(tab, { isEnabled }) {
  await setSettings({ sites_twitter: isEnabled })
}
