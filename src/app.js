import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import { FrameObserver } from 'Containers/Frame/frame.observer'
import { SavePanel } from 'Containers/Save/save.container.js'
import { SVGSymbols } from 'Elements/Icons/icon.symbols'

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
        <SVGSymbols />
        <Provider store={store}>
          <SavePanel />
        </Provider>
      </div>
    )
  }
}

ReactDOM.render(<AppFrame />, document.getElementById('pocket-extension-root'))
