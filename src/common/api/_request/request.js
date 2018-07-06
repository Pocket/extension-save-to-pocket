/* globals CONSUMER_KEY */
import { Base64 } from 'js-base64'
import { getSetting } from '../../interface'
import { getAccessToken, getAPIUrl } from '../../helpers'

/* Helper Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */

function request(options, skipAuth) {
  if (!CONSUMER_KEY) throw new Error('Invalid Auth Key')
  if (!skipAuth) options.data.access_token = getAccessToken()

  options.data.consumer_key = CONSUMER_KEY

  const headers = new Headers({
    'X-Accept': 'application/json',
    'Content-Type': 'application/json'
  })

  const serverAuth = getSetting('base_server_auth')

  if (serverAuth) {
    headers.append('Authorization', 'Basic ' + Base64.encode(serverAuth))
  }

  const fetchSettings = {
    method: 'POST',
    headers,
    body: JSON.stringify(options.data)
  }

  return fetch(getAPIUrl() + options.path, fetchSettings)
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => console.warn(error))
}

function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText)
  return response
}

export { request }
