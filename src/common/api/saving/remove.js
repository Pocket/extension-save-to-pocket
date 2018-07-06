import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function removeItem(itemId) {
  return request({
    path: 'send/',
    data: {
      actions: [
        {
          action: 'delete',
          item_id: itemId,
          cxt_ui: 'newtab'
        }
      ]
    }
  }).then(response => {
    return response
      ? { status: 'ok', response: response.action_results[0] }
      : undefined
  })
}
