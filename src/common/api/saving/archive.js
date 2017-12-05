import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function archiveItem( access_token, itemId ){
    return request({
        path: 'send/',
        data: {
            access_token: access_token,
            actions: [
                {
                    action: 'archive',
                    item_id: itemId
                }
            ]
        }
    })
        .then( response => {
            return response
                ? {status: 'ok', response:response.action_results[0]}
                : undefined
        })
}
