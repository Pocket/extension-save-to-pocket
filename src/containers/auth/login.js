import { Store } from 'react-chrome-redux'
import { PORT_NAME } from 'Common/constants'
import { sendMessage } from 'Common/interface'

getExtensionInfo().then(info => {
  console.log(info)
  const proxyStore = new Store({
    portName: PORT_NAME,
    extensionId: info.id
  })

  console.log(proxyStore)
  proxyStore.ready().then(() => {
    const siteCookies = getCookies(document.cookie)
    const payload = {
      userId: siteCookies['sess_user_id'],
      token: siteCookies['sess_exttok']
    }
    // DISPATCH ON SUCCESS
    proxyStore.dispatch({ type: 'AUTH_CODE_RECIEVED', payload })
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
  console.log('Getting Extension Info')
  return new Promise(resolve =>
    sendMessage(null, { action: 'getExtensionInfo' }, resolve)
  )
}
