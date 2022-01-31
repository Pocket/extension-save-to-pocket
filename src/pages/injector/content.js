import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import { SAVE_TO_POCKET_REQUEST } from 'actions'

/* Initial Setup
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const initialize = function () {
  chrome.runtime.onMessage.addListener(function (request) {
    const { action } = request
    if (action === SAVE_TO_POCKET_REQUEST) injectDomElements()
  })
}

/* Inject content into the DOM
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function injectDomElements() {
  const existingRoot = document.getElementById('pocket-extension-root')
  if (existingRoot) return

  const rootElement = document.createElement('div')
  rootElement.id = 'pocket-extension-root'
  const root = document.body.appendChild(rootElement)

  ReactDOM.render(<App />, root)
}

//eslint-disable-next-line
;(function () {
  if (window.top === window) {
    const setLoaded = () => initialize()

    // Check page has loaded and if not add listener for it
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setLoaded)
    } else {
      setLoaded()
    }
  }
})()
