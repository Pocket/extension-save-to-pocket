/*global safari*/

// Check page has loaded and if not add listener for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setLogoutLoaded)
} else {
  setLogoutLoaded()
}

function setLogoutLoaded() {
  setTimeout(function() {
    safari.extension.dispatchMessage('LOGGED_OUT_OF_POCKET')
  }, 500)
}
