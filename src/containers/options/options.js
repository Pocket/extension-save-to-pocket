import React from 'react'
import ReactDOM from 'react-dom'
import Options from './options.container'

// getExtensionInfo().then(info => {
//   const proxyStore = new Store({
//     portName: PORT_NAME,
//     extensionId: info.id
//   })

//   proxyStore.ready().then(() => {
//     const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)


//   })
// })

// function getExtensionInfo() {
//   return new Promise(resolve =>
//     sendMessage(null, { action: 'getExtensionInfo' }, resolve)
//   )
// }
ReactDOM.render(<Options/>, document.getElementById('pocket-extension-anchor'))