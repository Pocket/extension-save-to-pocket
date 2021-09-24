import { sendMessage } from 'common/interface'
import { AUTH_CODE_RECEIVED } from 'actions'

// Check page has loaded and if not add listener for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setLoginLoaded)
} else {
  setLoginLoaded()
}

async function setLoginLoaded() {
  try {
    const siteCookies = getCookies(document.cookie)
    const loginMessage = {
      userId: siteCookies['sess_user_id'],
      token: siteCookies['sess_exttok'],
    }

    // This time out is for user experience so they don't get a flash of
    // a page with no context, since we close this page after getting this data
    setTimeout(function () {
      sendMessage({
        type: AUTH_CODE_RECEIVED,
        payload: loginMessage,
      })
    }, 1000)
  } catch (err) {
    console.log(err)
  }
}

/* UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function getCookies(cookieString) {
  if (!cookieString || cookieString === '') return {}
  return cookieString
    .split(';')
    .map((x) => x.trim().split(/(=)/))
    .reduce(
      (cookiesObject, currentArray) => ({
        ...cookiesObject,
        [currentArray[0]]: decodeURIComponent(currentArray[2]),
      }),
      {},
    )
}
