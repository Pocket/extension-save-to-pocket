import { request } from '../_request/request'
import { getCurrentLanguageCode } from '../../helpers'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getTrendingTopics(data) {
  var lang = getCurrentLanguageCode()
  return request({
    path: 'getTrendingTopics/',
    data: {
      guid: data.guid,
      version: 2,
      locale_lang: lang
    }
  }).then(response => [{ status: 'ok', response }])
}
