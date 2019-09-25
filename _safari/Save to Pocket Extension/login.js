/*global safari*/

// Check page has loaded and if not add listener for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setLoginLoaded)
} else {
  setLoginLoaded()
}

function setLoginLoaded() {
  const siteCookies = getCookies(document.cookie)
  const loginMessage = {
    userId: siteCookies['sess_user_id'],
    token: siteCookies['sess_exttok']
  }

  setTimeout(function() {
    safari.extension.dispatchMessage('AUTH_CODE_RECEIVED', { ...loginMessage })
  }, 1000)
}

/* UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function getCookies(cookieString) {
  if (!cookieString || cookieString === '') return {}
  return cookieString
    .split(';')
    .map(x => x.trim().split(/(=)/))
    .reduce(
      (cookiesObject, currentArray) => ({
        ...cookiesObject,
        [currentArray[0]]: decodeURIComponent(currentArray[2])
      }),
      {}
    )
}
