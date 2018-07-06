import { request } from '../_request/request'
import { getCurrentLanguageCode } from '../../helpers'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getFeatures() {
  var locale_lang = getCurrentLanguageCode()
  return request({
    path: 'checkFeatures/',
    data: { locale_lang }
  }).then(response => {
    return response ? { response } : undefined
  })
}
