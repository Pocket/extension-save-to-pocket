import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function authorize(guid, userCookies) {
  return request(
    {
      path: 'oauth/authorize/',
      data: {
        guid,
        token: userCookies.token,
        user_id: userCookies.userId,
        account: '1',
        grant_type: 'extension',
      },
    },
    true,
  )
}
