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
    headers: headers,
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

function apiRequest(options, skipAuth) {
  return Promise((resolve, reject) => {
    if (!CONSUMER_KEY) throw new Error('Invalid Auth Key')
    if (!skipAuth) options.data.access_token = getAccessToken()
    options.data.consumer_key = CONSUMER_KEY

    const callback = `apiRequestCallback${options.path.replace(/\//g, '_')}`
    const url = getAPIUrl() + options.path
    const data = options.data || {}
    debugger
    window.safari.extension.dispatchMessage('callPocket', {
      url,
      method: 'POST',
      parameters: data,
      callback,
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'X-Accept': 'application/json',
        origin: 'safari://app.extension'
      }
    })

    window.safari.self.addEventListener(
      'message',
      ({ message: { name, message, headers, userInfo } }) => {
        console.log('swift message event', { name, message, userInfo })
        switch (name) {
          case 'apiRequestCallback_send':
            debugger
            console.log('send API Callback received')
            resolve(userInfo)
            break
          default:
            break
        }
      }
    )
  })
}

export { apiRequest as request }
