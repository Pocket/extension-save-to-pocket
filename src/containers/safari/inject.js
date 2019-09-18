/*global safari*/
import React from 'react'
import ReactDOM from 'react-dom'
import { dispatchInit } from 'containers/safari/dispatch'
import SafariApp from 'containers/safari/app.container'
import { CacheProvider } from '@emotion/core'
import createCache from '@emotion/cache'
import { MAIN_SCRIPT_INJECTED } from 'containers/safari/actions'
import { Provider } from 'react-redux'
import { store } from './store'
//

export function injectDomElements() {
  const existingRoot = document.getElementById('pocket-extension-root')
  if (existingRoot) return

  const rootElement = document.createElement('div')
  rootElement.id = 'pocket-extension-root'
  const root = document.body.appendChild(rootElement)

  const stylesElement = document.createElement('div')
  stylesElement.id = 'pocket-extension-styles'
  const styles = document.body.appendChild(stylesElement)

  const myCache = createCache({
    key: 'pocket',
    container: styles
  })

  ReactDOM.render(
    <Provider store={store}>
      <CacheProvider value={myCache}>
        <SafariApp />
      </CacheProvider>
    </Provider>,
    root,
    () => {
      safari.extension.dispatchMessage(MAIN_SCRIPT_INJECTED)
    }
  )
}

;(function() {
  if (window.top === window) {
    function setLoaded() {
      dispatchInit()
      injectDomElements()
    }

    // Check page has loaded and if not add listener for it
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setLoaded)
    } else {
      setLoaded()
    }
  }
})()
