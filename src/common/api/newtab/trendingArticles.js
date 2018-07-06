import { request } from '../_request/request'
import { getCurrentLanguageCode } from '../../helpers'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getTrendingArticles(data, count) {
  var lang = getCurrentLanguageCode()
  return request({
    path: 'getGlobalRecs/',
    data: {
      guid: data.guid,
      version: 2,
      locale_lang: lang,
      count
    }
  }).then(response => [{ status: 'ok', response }])
}
