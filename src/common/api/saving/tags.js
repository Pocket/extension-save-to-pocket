import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getSuggestedTags({ resolved_url, tabId }) {
  return request({
    path: 'suggested_tags/',
    data: { url: resolved_url }
  }).then(response => [{ tabId, status: 'ok', response }])
}

export function syncItemTags({ item_id, tags }) {
  return request({
    path: 'send/',
    data: {
      actions: [
        { action: 'tags_replace', item_id: parseInt(item_id, 10), tags }
      ]
    }
  }).then(response => response)
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
