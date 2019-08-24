/*global safari*/
// import React from 'react'
// import ReactDOM from 'react-dom'

;(function() {
  if (window.top === window) {
    let root // Temporary injection point

    /* Dispatch messages to SAE
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
    const MAIN_SCRIPT_INJECTED = 'MAIN_SCRIPT_INJECTED'
    // const USER_LOG_IN = 'USER_LOG_IN'
    // const USER_LOG_OUT = 'USER_LOG_OUT'
    // const SAVE_PAGE_TO_POCKET = 'SAVE_PAGE_TO_POCKET'
    // const SAVE_URL_TO_POCKET = 'SAVE_URL_TO_POCKET'

    // const ARCHIVE_ITEM = 'ARCHIVE_ITEM'
    // const REMOVE_ITEM = 'REMOVE_ITEM'
    // const EDIT_TAGS = 'EDIT_TAGS'

    /* Dispatched messages from SAE
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

    const SAVE_TO_POCKET_REQUEST = 'SAVE_TO_POCKET_REQUEST'
    const SAVE_TO_POCKET_SUCCESS = 'SAVE_TO_POCKET_SUCCESS'
    const SAVE_TO_POCKET_FAILURE = 'SAVE_TO_POCKET_FAILURE'

    const ARCHIVE_ITEM_SUCCESS = 'ARCHIVE_ITEM_SUCCESS'
    const ARCHIVE_ITEM_FAILURE = 'ARCHIVE_ITEM_FAILURE'

    const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS'
    const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE'

    const TAGS_ADDED_SUCCESS = 'TAGS_ADDED_SUCCESS'
    const TAGS_ADDED_FAILURE = 'TAGS_ADDED_FAILURE'

    const SUGGESTED_TAGS_SUCCESS = 'SUGGESTED_TAGS_SUCCESS'
    const SUGGESTED_TAGS_FAILURE = 'SUGGESTED_TAGS_FAILURE'

    const USER_LOG_IN_SUCCESS = 'USER_LOG_IN_SUCCESS'
    const USER_LOG_IN_FAILURE = 'USER_LOG_IN_FAILURE'

    const USER_LOG_OUT_SUCCESS = 'USER_LOG_OUT_SUCCESS'
    const USER_LOG_OUT_FAILURE = 'USER_LOG_IN_FAILURE'

    /* Add Safari Listeners
–––––––––––––––––––––––––––––––––––––––––––––––––– */
    safari.self.addEventListener('message', handleMessage)

    /* Handle incoming messages
–––––––––––––––––––––––––––––––––––––––––––––––––– */
    function handleMessage(event) {
      const { message, name = 'Unknown Action' } = event || {}
      console.log(event)

      switch (name) {
        case SAVE_TO_POCKET_REQUEST: {
          root.innerHTML = '<div><em>Saving</em></div>'
          return
        }

        case SAVE_TO_POCKET_SUCCESS: {
          root.innerHTML = '<div>Saved</div>'
          return
        }

        case SAVE_TO_POCKET_FAILURE: {
          root.innerHTML = '<div><em>Oops—Save Failed</em></div>'
          return
        }

        case ARCHIVE_ITEM_SUCCESS: {
          return
        }

        case ARCHIVE_ITEM_FAILURE: {
          return
        }

        case REMOVE_ITEM_SUCCESS: {
          return
        }

        case REMOVE_ITEM_FAILURE: {
          return
        }

        case TAGS_ADDED_SUCCESS: {
          return
        }

        case TAGS_ADDED_FAILURE: {
          return
        }

        case SUGGESTED_TAGS_SUCCESS: {
          return
        }

        case SUGGESTED_TAGS_FAILURE: {
          return
        }

        case USER_LOG_IN_SUCCESS: {
          return
        }

        case USER_LOG_IN_FAILURE: {
          return
        }

        case USER_LOG_OUT_SUCCESS: {
          return
        }

        case USER_LOG_OUT_FAILURE: {
          return
        }

        default: {
          console.groupCollapsed(name)
          console.log(message)
          console.groupEnd(name)
          break
        }
      }
    }

    /* Initialize injected script
–––––––––––––––––––––––––––––––––––––––––––––––––– */

    function setLoaded() {
      const element = document.createElement('div')
      element.id = 'pocket-extension-root'

      root = document.body.appendChild(element)
      root.innerHTML = '<div></div>'

      safari.extension.dispatchMessage(MAIN_SCRIPT_INJECTED)
    }

    // Check page has loaded and if not add listener for it
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setLoaded)
    } else {
      setLoaded()
    }
  }
})()
