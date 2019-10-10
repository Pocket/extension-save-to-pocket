import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function archiveItem(itemId, actionInfo) {
  return request({
    path: 'send/',
    data: {
      actions: [
        {
          action: 'archive',
          item_id: itemId,
          ...actionInfo
        }
      ]
    }
  }).then(response => {
    return response
      ? { status: 'ok', response: response.action_results[0] }
      : undefined
  })
}
