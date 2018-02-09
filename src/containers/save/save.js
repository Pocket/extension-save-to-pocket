import { Store } from 'react-chrome-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'

import { PORT_NAME } from '../../common/constants'
import { sendMessage } from '../../common/interface'

import { mapStateToProps, mapDispatchToProps } from '../../store/connect'
import App from './save.app'

const proxyStore = new Store({ portName: PORT_NAME })

function getTabId() {
    return new Promise(resolve =>
        sendMessage(null, { action: 'getTabId' }, resolve)
    )
}

proxyStore.ready(getTabId).then(tabId => {
    document.addEventListener('click', function() {
        sendMessage(null, { action: 'frameFocus', status: true })
    })

    const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

    ReactDOM.render(
        <Provider store={proxyStore}>
            <ConnectedApp tab_id={tabId} />
        </Provider>,
        document.getElementById('pocket-extension-root')
    )
})
