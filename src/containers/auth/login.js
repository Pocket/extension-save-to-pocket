import { Store } from 'webext-redux'
import { PORT_NAME } from 'common/constants'
import { sendMessage } from 'common/interface'

getExtensionInfo().then(info => {
  const proxyStore = new Store({
    portName: PORT_NAME,
    extensionId: info.id
  })

  proxyStore.ready().then(() => {
    console.log('Proxy Ready')

    const siteCookies = getCookies(document.cookie)
    const loginMessage = {
      userId: siteCookies['sess_user_id'],
      token: siteCookies['sess_exttok']
    }
    // DISPATCH ON SUCCESS
    proxyStore.dispatch({ type: 'AUTH_CODE_RECIEVED', loginMessage })
  })
})

/* UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function getCookies(cookieString) {
  if (!cookieString || cookieString === '') return {}
  return cookieString
    .split(';')
    .map(x => x.trim().split(/(=)/))
    .reduce(
      (cookiesObject, currentArray) => ({
        ...cookiesObject,
        [currentArray[0]]: decodeURIComponent(currentArray[2])
      }),
      {}
    )
}

function getExtensionInfo() {
  return new Promise(resolve =>
    sendMessage(null, { action: 'getExtensionInfo' }, resolve)
  )
}
