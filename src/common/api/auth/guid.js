import { request } from '../_request/request'
import { getSetting } from '../../interface'

export async function getGuid() {
  const extensionGuid = await getExtensionGuid()
  if (extensionGuid) return extensionGuid

  const siteGuid = await getSiteGuid()
  if (siteGuid) return siteGuid

  const serverGuid = await getServerGuid()
  if (serverGuid) return serverGuid

  return false
}

export async function getServerGuid() {
  try {
    return await request({ path: 'guid', data: { abt: 1 } }).then(
      (data) => data.guid,
    )
  } catch (err) {
    console.info(err)
  }
}

export async function getExtensionGuid() {
  const guid = await getSetting('guid')
  return guid ? guid : false
}

export async function getSiteGuid() {
  const cookies = await chrome.cookies.get({
    url: 'https://getpocket.com/',
    name: 'sess_guid',
  })

  return cookies?.value
}
