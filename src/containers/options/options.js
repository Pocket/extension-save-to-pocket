// import React from 'react'
// import ReactDOM from 'react-dom'
// import { Provider, connect } from 'react-redux'
// import { Store } from 'react-chrome-redux'
// import { PORT_NAME } from '../../Common/constants'
// import { mapStateToProps, mapDispatchToProps } from '../../store/connect'
// import { sendMessage } from '../../Common/interface'
// import App from './options.app'
// import { SVGSymbols } from 'Elements/Icons/icon.symbols'

// getExtensionInfo().then(info => {
//   const proxyStore = new Store({
//     portName: PORT_NAME,
//     extensionId: info.id
//   })

//   proxyStore.ready().then(() => {
//     const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

//     ReactDOM.render(
//       <React.Fragment>
//         <SVGSymbols />
//         <Provider store={proxyStore}>
//           <ConnectedApp />
//         </Provider>
//       </React.Fragment>,
//       document.getElementById('pocket-extension-anchor')
//     )
//   })
// })

// function getExtensionInfo() {
//   return new Promise(resolve =>
//     sendMessage(null, { action: 'getExtensionInfo' }, resolve)
//   )
// }
