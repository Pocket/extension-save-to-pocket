import { setSettings } from 'common/interface'
import { setDefaultIcon } from 'common/interface'

export function initColorMode() {
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
  setColorMode(null, { theme })
}

export async function setColorMode(tab, { theme }) {
  await setSettings({ theme })
  setDefaultIcon()
}
