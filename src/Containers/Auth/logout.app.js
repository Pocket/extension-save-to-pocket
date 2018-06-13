import { Store } from 'react-chrome-redux'
import { PORT_NAME } from '../../Common/constants'
import { sendMessage } from '../../Common/interface'

getExtensionInfo().then(info => {
  const proxyStore = new Store({
    portName: PORT_NAME,
    extensionId: info.id
  })

  proxyStore.ready().then(() => {
    proxyStore.dispatch({ type: 'USER_LOGOUT' })
  })
})

function getExtensionInfo() {
  return new Promise(resolve =>
    sendMessage(null, { action: 'getExtensionInfo' }, resolve)
  )
}
