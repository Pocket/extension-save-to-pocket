// import React from 'react'
// import ReactDOM from 'react-dom'

import { SAVE_TO_POCKET_REQUEST } from 'actions'
import { SAVE_TO_POCKET_SUCCESS } from 'actions'
import { SAVE_TO_POCKET_FAILURE } from 'actions'
import { ARCHIVE_ITEM_SUCCESS } from 'actions'
import { ARCHIVE_ITEM_FAILURE } from 'actions'
import { REMOVE_ITEM_SUCCESS } from 'actions'
import { REMOVE_ITEM_FAILURE } from 'actions'
import { TAGS_ADDED_SUCCESS } from 'actions'
import { TAGS_ADDED_FAILURE } from 'actions'
import { SUGGESTED_TAGS_REQUEST } from 'actions'
import { SUGGESTED_TAGS_SUCCESS } from 'actions'
import { SUGGESTED_TAGS_FAILURE } from 'actions'

import { GET_RECS_REQUEST } from 'actions'
import { GET_RECS_SUCCESS } from 'actions'
import { GET_RECS_FAILURE } from 'actions'
import { SAVE_REC_SUCCESS } from 'actions'

import { USER_LOG_IN_SUCCESS } from 'actions'
import { USER_LOG_IN_FAILURE } from 'actions'
import { USER_LOG_OUT_SUCCESS } from 'actions'
import { USER_LOG_OUT_FAILURE } from 'actions'
import { COLOR_MODE_CHANGE } from 'actions'
import { UPDATE_STORED_TAGS } from 'actions'

chrome.runtime.onMessage.addListener(function (request) {
  const { action: name, payload: message } = request
  console.log({ name, message })
})

/* Initial Setup
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const initialize = function () {
  chrome.runtime.onMessage.addListener(function (request) {
    const { action: name, payload: message } = request
    handleMessage({ name, message })
  })

  // Make sure the toolbar icon is in sync with users light/dark preference
  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
  const handleDarkModeChange = (mql) => {
    const darkMode = mql.matches
    sendMessageToBackground({ type: COLOR_MODE_CHANGE, payload: { darkMode } })
  }
  handleDarkModeChange(mediaQueryList)
  mediaQueryList.addEventListener('change', handleDarkModeChange)
}

/* Inject content into the DOM
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function injectDomElements() {
  const existingRoot = document.getElementById('pocket-extension-root')
  if (existingRoot) return

  const rootElement = document.createElement('div')
  rootElement.id = 'pocket-extension-root'
  document.body.appendChild(rootElement)

  // ReactDOM.render(<ExtensionApp />, root)
}

/* Outgoing messages Setup
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function sendMessageToBackground(payload) {
  chrome.runtime.sendMessage(payload)
}

/* Handle incoming messages
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function handleMessage(event) {
  const { message, name = 'Unknown Action' } = event || {}

  console.groupCollapsed(`RECEIVE: ${name}`)
  console.log(message)
  console.groupEnd(`RECEIVE: ${name}`)

  switch (name) {
    case SAVE_TO_POCKET_REQUEST: {
      injectDomElements() // Check for DOM elements

      sendMessageToBackground({ type: SAVE_TO_POCKET_REQUEST })
      return
    }

    case SAVE_TO_POCKET_SUCCESS: {
      sendMessageToBackground({
        type: SAVE_TO_POCKET_SUCCESS,
        payload: message,
      })
      return
    }

    case SAVE_TO_POCKET_FAILURE: {
      sendMessageToBackground({ type: SAVE_TO_POCKET_FAILURE })
      return
    }

    case ARCHIVE_ITEM_SUCCESS: {
      sendMessageToBackground({ type: ARCHIVE_ITEM_SUCCESS })
      return
    }

    case ARCHIVE_ITEM_FAILURE: {
      sendMessageToBackground({ type: ARCHIVE_ITEM_FAILURE })
      return
    }

    case REMOVE_ITEM_SUCCESS: {
      sendMessageToBackground({ type: REMOVE_ITEM_SUCCESS, payload: message })
      return
    }

    case REMOVE_ITEM_FAILURE: {
      sendMessageToBackground({ type: REMOVE_ITEM_FAILURE, payload: message })
      return
    }

    case TAGS_ADDED_SUCCESS: {
      sendMessageToBackground({ type: TAGS_ADDED_SUCCESS, payload: message })
      return
    }

    case TAGS_ADDED_FAILURE: {
      sendMessageToBackground({ type: TAGS_ADDED_FAILURE, payload: message })
      return
    }

    case UPDATE_STORED_TAGS: {
      sendMessageToBackground({ type: UPDATE_STORED_TAGS, payload: message })
      return
    }

    case SUGGESTED_TAGS_REQUEST: {
      sendMessageToBackground({ type: SUGGESTED_TAGS_REQUEST })
      return
    }

    case SUGGESTED_TAGS_SUCCESS: {
      sendMessageToBackground({
        type: SUGGESTED_TAGS_SUCCESS,
        payload: message,
      })
      return
    }

    case SUGGESTED_TAGS_FAILURE: {
      sendMessageToBackground({
        type: SUGGESTED_TAGS_FAILURE,
        payload: message,
      })
      return
    }

    case USER_LOG_IN_SUCCESS: {
      sendMessageToBackground({ type: USER_LOG_IN_SUCCESS, payload: message })
      return
    }

    case USER_LOG_IN_FAILURE: {
      sendMessageToBackground({ type: USER_LOG_IN_FAILURE, payload: message })
      return
    }

    case USER_LOG_OUT_SUCCESS: {
      sendMessageToBackground({ type: USER_LOG_OUT_SUCCESS })
      return
    }

    case USER_LOG_OUT_FAILURE: {
      sendMessageToBackground({ type: USER_LOG_OUT_FAILURE, payload: message })
      return
    }

    case GET_RECS_REQUEST: {
      sendMessageToBackground({ type: GET_RECS_REQUEST, payload: message })
      return
    }

    case GET_RECS_SUCCESS: {
      sendMessageToBackground({ type: GET_RECS_SUCCESS, payload: message })
      return
    }

    case GET_RECS_FAILURE: {
      sendMessageToBackground({ type: GET_RECS_FAILURE, payload: message })
      return
    }

    case SAVE_REC_SUCCESS: {
      sendMessageToBackground({ type: SAVE_REC_SUCCESS, payload: message })
      return
    }

    default: {
      return
    }
  }
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
