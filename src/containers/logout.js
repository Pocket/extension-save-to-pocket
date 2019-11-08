import { sendMessage } from 'common/interface'
import { LOGGED_OUT_OF_POCKET } from 'actions'

// Check page has loaded and if not add listener for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setLogoutLoaded)
} else {
  setLogoutLoaded()
}

function setLogoutLoaded() {
  setTimeout(function() {
    sendMessage({ type: LOGGED_OUT_OF_POCKET })
  }, 500)
}
