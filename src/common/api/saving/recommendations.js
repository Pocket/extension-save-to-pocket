import { request } from '../_request/request'
import { getCurrentLanguageCode } from '../../helpers'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getRecommendations(resolved_id) {
  var lang = getCurrentLanguageCode()
  return request({
    path: 'getSuggestedItems/',
    data: {
      resolved_id: resolved_id,
      version: 2,
      locale_lang: lang,
      count: 3
    }
  }).then(response => response)
}

export function saveRecToPocket(saveObject, access_token) {
  return request({
    path: 'send/',
    data: {
      access_token: access_token,
      actions: [
        {
          action: 'add',
          url: saveObject.url,
          title: saveObject.title
        },
        {
          action: 'itemrec_save',
          item_id: saveObject.item_id,
          cxt_ui: 'onsave_rec',
          cxt_view: 'ext_recs',
          cxt_src_item: saveObject.source_id,
          cxt_index: saveObject.position
        }
      ]
    }
  }).then(response => {
    return response
      ? { saveObject, status: 'ok', response: response.action_results[0] }
      : undefined
  })
}

export function openRecommendation(saveObject, access_token) {
  return request({
    path: 'send/',
    data: {
      access_token: access_token,
      actions: [
        {
          action: 'itemrec_open',
          item_id: saveObject.item_id,
          cxt_ui: 'onsave_rec',
          cxt_view: 'ext_recs',
          cxt_src_item: saveObject.source_id,
          cxt_index: saveObject.position
        }
      ]
    }
  }).then(response => {
    return response
      ? { saveObject, status: 'ok', response: response.action_results[0] }
      : undefined
  })
}
