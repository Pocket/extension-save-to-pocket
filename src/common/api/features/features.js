import { request } from '../_request/request'
import { getCurrentLanguageCode } from '../../helpers'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getFeatures(access_token) {
  var locale_lang = getCurrentLanguageCode()
  return request({
    path: 'checkFeatures/',
    data: {
      locale_lang,
      access_token
    }
  }).then(response => {
    return response ? { response } : undefined
  })
}
