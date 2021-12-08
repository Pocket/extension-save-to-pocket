import { CONSUMER_KEY, API_URL } from 'common/constants'
import { Base64 } from 'js-base64'
import { getSetting } from '../../interface'
import { getAccessToken } from '../../helpers'

/* Helper Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */

async function request(options, skipAuth) {
  if (!CONSUMER_KEY) throw new Error('Invalid Auth Key')
  if (!skipAuth) options.data.access_token = await getAccessToken()

  options.data.consumer_key = CONSUMER_KEY

  const headers = new Headers({
    'X-Accept': 'application/json',
    'Content-Type': 'application/json',
  })

  const serverAuth = await getSetting('base_server_auth')

  if (serverAuth) {
    headers.append('Authorization', 'Basic ' + Base64.encode(serverAuth))
  }

  const fetchSettings = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(options.data),
  }

  return fetch(API_URL + options.path, fetchSettings)
    .then(handleErrors)
    .then((response) => response.json())
}

function handleErrors(response) {
  if (!response.ok) {
    const e = new Error('Request Error')
    e.name = response.status === 401
      ? `Auth[${response.status}]`
      : `Generic[${response.status}]`
    throw e
  }
  return response
}

export { request }
