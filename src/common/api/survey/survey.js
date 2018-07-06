import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function sendSurvey(surveyObject, access_token) {
  return request({
    path: 'surveyResponse/',
    data: {
      access_token: access_token,
      ...surveyObject
    }
  }).then(response => {
    return response ? { status: response.status } : undefined
  })
}
