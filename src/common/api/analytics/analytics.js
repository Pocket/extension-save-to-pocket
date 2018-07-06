import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function sendAnalytics(context, guid) {
  return request(
    {
      path: 'pv/',
      data: {
        guid,
        actions: JSON.stringify(context)
      }
    },
    false
  ).then(response => response)
}

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function sendSpocAnalytics(access_token, actions) {
  return request({
    path: 'send/',
    data: {
      access_token,
      actions
    }
  }).then(response => {
    return response
      ? { status: 'ok', response: response.action_results[0] }
      : undefined
  })
}

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function sendSurveyAnalytics(access_token, guid, actions) {
  return request({
    path: 'send/',
    data: {
      access_token,
      guid,
      actions
    }
  }).then(response => {
    return response
      ? { status: 'ok', response: response.action_results[0] }
      : undefined
  })
}
