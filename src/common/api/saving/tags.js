import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getOnSaveTags(url) {
  return request({
    path: 'suggested_tags/',
    data: {
      url,
      version: 2
    }
  }).then(response => response)
}

export function syncItemTags(id, tags, actionInfo) {
  return request({
    path: 'send/',
    data: {
      actions: [{ action: 'tags_replace', item_id: id, tags, ...actionInfo }]
    }
  }).then(response => {
    return response
      ? { status: 'ok', response: response.action_results[0] }
      : undefined
  })
}

export function fetchStoredTags(since) {
  return request({
    path: 'get/',
    data: {
      tags: 1,
      taglist: 1,
      account: 1,
      since: since ? since : 0
    }
  }).then(response => response)
}
