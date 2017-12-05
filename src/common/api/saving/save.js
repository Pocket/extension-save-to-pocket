import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function saveToPocket( saveObject, access_token ){
    return request({
        path: 'send/',
        data: {
            access_token: access_token,
            actions: [
                {
                    action: 'add',
                    url: saveObject.url,
                    title: saveObject.title
                }
            ]
        }
    })
        .then( response => {
            return response
                ? {saveObject, status: 'ok', response:response.action_results[0]}
                : undefined
        })
}
