import { request } from '../_request/request'
import { getCurrentLanguageCode } from '../../helpers'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getRecommendations( resolved_id ){
    var lang = getCurrentLanguageCode()
    return request ({
        path: 'getSuggestedItems/',
        data: {
            resolved_id     : resolved_id,
            version         : 2,
            locale_lang     : lang,
            count           : 3
        }
    })
        .then( response => response)
}
