import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { Store } from 'react-chrome-redux'
import { PORT_NAME } from 'common/constants'
import { mapStateToProps, mapDispatchToProps } from '../../store/connect'
import { sendMessage } from 'common/interface'
import App from './options.app'

getExtensionInfo().then(info => {
  const proxyStore = new Store({
    portName: PORT_NAME,
    extensionId: info.id
  })

  proxyStore.ready().then(() => {
    const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

    ReactDOM.render(
      <Provider store={proxyStore}>
        <ConnectedApp />
      </Provider>,
      document.getElementById('pocket-extension-anchor')
    )
  })
})

function getExtensionInfo() {
  return new Promise(resolve =>
    sendMessage(null, { action: 'getExtensionInfo' }, resolve)
  )
}
