import { request } from '../_request/request'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getOnSaveTags(saveObject) {
    return request({
        path: 'suggested_tags/',
        data: {
            url: saveObject.url
        }
    }).then(response => [{ saveObject, status: 'ok', response }])
}

export function syncItemTags(id, tags) {
    return request({
        path: 'send/',
        data: {
            actions: [{ action: 'tags_add', item_id: id, tags }]
        }
    }).then(response => response)
}
