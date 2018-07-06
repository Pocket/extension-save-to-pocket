import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getItem({ item_id }) {
  return request({
    path: 'get/',
    data: {
      tags: 1,
      item: item_id
    }
  }).then(response => {
    return response
      ? { status: 'ok', response: response.list[item_id] }
      : undefined
  })
}
