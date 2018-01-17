/* globals CONSUMER_KEY */

import { getAccessToken, getAPIUrl } from '../../helpers'

/* Helper Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */

function request(options, skipAuth) {
    if (!CONSUMER_KEY) throw new Error('Invalid Auth Key')
    if (!skipAuth) options.data.access_token = getAccessToken()

    options.data.consumer_key = CONSUMER_KEY

    const fetchSettings = {
        method: 'POST',
        headers: new Headers({
            'X-Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(options.data)
    }

    return fetch(getAPIUrl() + options.path, fetchSettings)
        .then(handleErrors)
        .then(response => response.json())
        .catch(error => console.log(error))
}

function handleErrors(response) {
    if (!response.ok) throw Error(response.statusText)
    return response
}

export { request }
