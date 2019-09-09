import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function removeItem(access_token, itemId, actionInfo) {
  return request({
    path: 'send/',
    data: {
      access_token: access_token,
      actions: [
        {
          action: 'delete',
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
