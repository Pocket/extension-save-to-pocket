import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function sendAnalytics( context, guid ){
    return request({
        path: 'pv/',
        data: {
            guid: guid,
            actions: JSON.stringify(context)
        }
    }, false)
        .then( response => response)
}
