import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'
import ExtensionApp from 'containers/app.container'
import { dispatchInit } from 'containers/dispatch'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store'
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
        <ExtensionApp />
      </CacheProvider>
    </Provider>,
    root
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
