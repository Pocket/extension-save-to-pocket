import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Store } from 'react-chrome-redux'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'emotion-theming'

import { PORT_NAME } from 'Common/constants'
import { sendMessage } from 'Common/interface'

import { FrameObserver } from 'Containers/Frame/frame.observer'
import { SavePanel } from 'Containers/Save/save.container.js'
import { SVGSymbols } from 'Elements/Icons/icon.symbols'
import { Themes } from 'Elements/Themes/themes'

/* APP FRAME
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export class AppFrame extends Component {
  constructor(props) {
    super(props)
    this.heightRef = React.createRef()
  }

  componentDidMount() {
    const node = this.heightRef.current
    this.frameObserver = new FrameObserver(node)
    this.frameObserver.observe()
  }

  componentWillUnmount() {
    this.frameObserver.disconnect()
  }

  render() {
    return (
      <div ref={this.heightRef} style={{ width: '320px', padding: '10px' }}>
        <SavePanel />
      </div>
    )
  }
}

/* MOUNT APP
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function getExtensionInfo() {
  return new Promise(resolve =>
    sendMessage(null, { action: 'getExtensionInfo' }, resolve)
  )
}

getExtensionInfo().then(info => {
  const proxyStore = new Store({
    portName: PORT_NAME,
    extensionId: info.id
  })

  proxyStore.ready().then(() => {
    document.addEventListener('click', function() {
      sendMessage(null, { action: 'frameFocus', status: true })
    })

    ReactDOM.render(
      <React.Fragment>
        <SVGSymbols />
        <ThemeProvider theme={Themes['light']}>
          <Provider store={proxyStore}>
            <AppFrame />
          </Provider>
        </ThemeProvider>
      </React.Fragment>,
      document.getElementById('pocket-extension-root')
    )
  })
})
