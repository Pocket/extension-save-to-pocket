/*global safari*/

/* Add Safari Listeners
–––––––––––––––––––––––––––––––––––––––––––––––––– */

safari.self.addEventListener('message', handleMessage)

/* Handle incoming messages
–––––––––––––––––––––––––––––––––––––––––––––––––– */

function handleMessage(event) {
  const { message, name = 'Unknown Action' } = event.message || {}

  switch (message) {
    case 'SAVE_ACTION_INITIATED': {
      console.log('Save Action Initiated')
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
  safari.extension.dispatchMessage('MAIN_SCRIPT_INJECTED')
}

// Check page has loaded and if not add listener for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setLoaded)
} else {
  setLoaded()
}
