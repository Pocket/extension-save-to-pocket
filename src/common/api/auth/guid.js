import { request } from '../_request/request'
import { getSetting } from '../../interface'

export function getGuid() {
  return new Promise((resolve, reject) => {
    return Promise.all([getExtensionGuid(), getSiteGuid()])
      .then((resolvedValues) => {
        if (arrayHasValues(resolvedValues).length) {
          // Extension Guid
          if (resolvedValues[0])
            resolve({
              source: 'extension',
              guid: resolvedValues[0],
            })
          // Site Guid
          if (resolvedValues[1])
            resolve({
              source: 'site',
              guid: resolvedValues[1].value,
            })
        } else {
          // Server Guid
          getServerGuid()
            .then((data) => resolve({ source: 'server', guid: data.guid }))
            .catch((err) => reject(err))
        }
      })
      .catch((err) => reject(err))
  })
}

export async function getServerGuid() {
  try {
    return await request({ path: 'guid', data: { abt: 1 } }).then(
      (data) => data.guid
    )
  } catch (err) {
    console.info(err)
  }
}

export function getExtensionGuid() {
  return new Promise((resolve) => resolve(getSetting('guid')))
}

export async function getSiteGuid() {
  const cookies = await chrome.cookies.get({
    url: 'https://getpocket.com/',
    name: 'sess_guid',
  })

  return cookies
}
