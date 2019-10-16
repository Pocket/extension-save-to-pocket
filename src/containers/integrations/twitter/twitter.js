/* global chrome safari */
import { markSaved } from './twitter.handlers'
import { pageMutationHandler } from './twitter.handlers'
import { addPocketButtons, removePocketButtons } from './twitter.handlers'

import { CHECK_TWITTER_INTEGRATION } from 'actions'
import { START_TWITTER_INTEGRATION } from 'actions'
import { STOP_TWITTER_INTEGRATION } from 'actions'
import { TWITTER_SAVE_SUCCESS } from 'actions'

import { saveButtonStyles } from './twitter.ui'

/* Prepare twitter integration
–––––––––––––––––––––––––––––––––––––––––––––––––– */
;(function() {
  if (window.top === window) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setLoaded)
    } else {
      setLoaded()
    }
  }
})()

function setLoaded() {
  if (chrome) {
    chrome.runtime.onMessage.addListener(function(request) {
      const { action: name, payload: message } = request
      handleMessage({ name, message })
    })
  }

  if (typeof safari !== 'undefined') {
    safari.self.addEventListener('message', handleMessage)
  }

  // Inject styles at page level to avoid overhead
  saveButtonStyles()

  // Check if user has twitter integration iturned on
  chrome.runtime.sendMessage({ type: CHECK_TWITTER_INTEGRATION })
}

/* Set Mutation Observers
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const twitterObserver = new MutationObserver(pageMutationHandler)
const mutationConfig = {
  childList: true,
  attributes: false,
  characterData: false,
  subtree: true
}

export function startIntegration() {
  const root = document.querySelector('#react-root')
  twitterObserver.observe(root, mutationConfig)
  addPocketButtons()
}

export function stopIntegration() {
  twitterObserver.disconnect()
  removePocketButtons()
}

/* Set up message handler
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function handleMessage(event) {
  const { message, name = 'Unknown Action' } = event || {}

  console.groupCollapsed(`RECEIVE: ${name}`)
  console.log(message)
  console.groupEnd(`RECEIVE: ${name}`)

  switch (name) {
    case START_TWITTER_INTEGRATION: {
      startIntegration()
      return
    }

    case STOP_TWITTER_INTEGRATION: {
      stopIntegration()
      return
    }

    case TWITTER_SAVE_SUCCESS: {
      markSaved(message)
      return
    }

    default: {
      return
    }
  }
}
