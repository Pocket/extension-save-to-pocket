import { request } from '../_request/request'
import { getSetting, cookies } from '../../interface'
import { arrayHasValues } from '../../utilities'
import { getBaseUrl } from '../../helpers'

export function getGuid() {
  return new Promise((resolve, reject) => {
    return Promise.all([getExtensionGuid(), getSiteGuid()])
      .then(resolvedValues => {
        if (arrayHasValues(resolvedValues).length) {
          // Extension Guid
          if (resolvedValues[0])
            resolve({
              source: 'extension',
              guid: resolvedValues[0]
            })
          // Site Guid
          if (resolvedValues[1]) {
            resolve({
              source: 'site',
              guid: resolvedValues[1].value
            })
          }
        } else {
          // Server Guid
          getServerGuid()
            .then(data => {
              return resolve({ source: 'server', guid: data.guid })
            })
            .catch(err => reject(err))
        }
      })
      .catch(err => reject(err))
  })
}

export function getServerGuid() {
  return request({ path: 'guid', data: { abt: 1 } })
}

export function getExtensionGuid() {
  return new Promise(resolve => resolve(getSetting('guid')))
}

export function getSiteGuid() {
  return new Promise((resolve, reject) => {
    try {
      cookies().get(
        {
          url: getBaseUrl(),
          name: 'sess_guid'
        },
        cookie => resolve(cookie)
      )
    } catch (err) {
      reject('Error getting Cookies')
    }
  })
}
