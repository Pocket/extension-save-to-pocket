import { Store } from 'react-chrome-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'

import { PORT_NAME } from '../../common/constants'
import { sendMessage } from '../../common/interface'

import { mapStateToProps, mapDispatchToProps } from '../../store/connect'
import App from './save.app'

import { SVGSymbols } from 'Elements/Icons/icon.symbols'

getExtensionInfo().then(info => {
  const proxyStore = new Store({
    portName: PORT_NAME,
    extensionId: info.id
  })

  proxyStore.ready(getTabId).then(tabId => {
    document.addEventListener('click', function() {
      sendMessage(null, { action: 'frameFocus', status: true })
    })

    const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

    ReactDOM.render(
      <React.Fragment>
        <SVGSymbols />
        <Provider store={proxyStore}>
          <ConnectedApp tab_id={tabId} />
        </Provider>
      </React.Fragment>,
      document.getElementById('pocket-extension-root')
    )
  })
})

function getTabId() {
  return new Promise(resolve =>
    sendMessage(null, { action: 'getTabId' }, resolve)
  )
}

function getExtensionInfo() {
  return new Promise(resolve =>
    sendMessage(null, { action: 'getExtensionInfo' }, resolve)
  )
}
