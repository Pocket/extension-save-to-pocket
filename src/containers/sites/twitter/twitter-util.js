import styles from './twitter.scss' // Import Styles
import { sendMessage } from '../../../common/interface'

// Define Markup
const saveToPocketMarkup = `
<div class="ProfileTweet-actionButton u-textUserColorHover js-actionButton ${styles.pocketIconContainer}"
    type="button" data-nav="share_tweet_to_pocket">
    <svg class=${styles.pocketIconFill} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1474 7.69474L9.85262 11.7368C9.63157 11.9895 9.2842 12.0842 9.03157 12.0842C8.71578 12.0842 8.39999 11.9895 8.14736 11.7368L3.91578 7.69474C3.47368 7.22105 3.41052 6.43158 3.91578 5.92631C4.38947 5.48421 5.17894 5.42105 5.65262 5.92631L9.03157 9.17895L12.4737 5.92631C12.9158 5.42105 13.7053 5.48421 14.1474 5.92631C14.5895 6.43158 14.5895 7.22105 14.1474 7.69474M16.3263 1H1.73684C0.789474 1 0 1.72632 0 2.67368V8.07368C0 12.9684 4.04211 17.0421 9.03158 17.0421C13.9895 17.0421 18 12.9684 18 8.07368V2.67368C18 1.72632 17.2421 1 16.3263 1"/>
    </svg>


    <svg class=${styles.pocketIconStroke} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.87942 2.5C1.67164 2.5 1.5 2.67337 1.5 2.89083V7.66667C1.5 11.8566 4.85944 15.25 9 15.25C13.1406 15.25 16.5 11.8566 16.5 7.66667V2.89083C16.5 2.67337 16.3284 2.5 16.1206 2.5H1.87942ZM1.87942 1H16.1206C17.1602 1 18 1.8483 18 2.89083V7.66667C18 12.6817 13.9724 16.75 9 16.75C4.02761 16.75 0 12.6817 0 7.66667V2.89083C0 1.8483 0.839815 1 1.87942 1ZM12.2247 6.08969C12.5203 5.79957 12.9952 5.80405 13.2853 6.0997C13.5754 6.39535 13.5709 6.8702 13.2753 7.16031L9.5253 10.8402C9.23359 11.1264 8.76641 11.1264 8.4747 10.8402L4.7247 7.16031C4.42905 6.8702 4.42457 6.39535 4.71469 6.0997C5.0048 5.80405 5.47965 5.79957 5.7753 6.08969L9 9.25406L12.2247 6.08969Z"/>
    </svg>

</div>
`
const saveToPocketButton = document.createElement('div')
saveToPocketButton.classList.add(
  'ProfileTweet-action',
  'ProfileTweet-action--stp'
)
saveToPocketButton.innerHTML = saveToPocketMarkup

// returns a cloned save to pocket button
export function getPocketButtonClone({ permaLink, isFocusViewTweet }) {
  const pocketIconButtonClone = saveToPocketButton.cloneNode(true)
  // the id is used in the resolve save event to find the element and apply styles to it
  pocketIconButtonClone.id = `pocketButton-${Math.random()
    .toString(36)
    .substring(7)}`
  pocketIconButtonClone.setAttribute('data-permalink-path', permaLink)
  pocketIconButtonClone.classList.add(isFocusViewTweet ? styles['focus-view'] : styles['list-view'])

  return pocketIconButtonClone
}

export function getTweetLink($article) {
  let link

  if($article.querySelector('[lang] > a')) {
    link = $article.querySelector('[lang] > a').getAttribute('href')
  } else {
    link = $article.querySelector('#tweet-rich-content-label a').getAttribute('href')
  }

  const isExternalLink = link && link.match(/https?:/i)

  return isExternalLink && link
}

// Handle saving
export function handleSave(elementId, permaLink, event) {
  event.preventDefault()
  const $article = document.getElementById(elementId).closest('article')
  const tweetLink = getTweetLink($article)
  sendMessage(
    null,
    { action: 'twitterSave', elementId, permaLink, tweetLink },
    function resolveSave(data) {
      const elementId = data.saveObject.elementId
      const tweetActionContainer = document.getElementById(elementId)
      tweetActionContainer.classList.add(styles.saved)
    }
  )
}

export function getTweetInfo(twitterActionListCotnainerElement) {
  // Find the Tweet container
  const $tweet = twitterActionListCotnainerElement.closest('article')
  // Fetch the single time element, from there we can grab the href from the parent to get the screen name and status id.

  if ($tweet.length === 0) {
    // This is legacy twitter, no article tag parent present!'
    throw Error('legacyTwitter')
  }

  let permaLink = window.location.pathname
  const $link = $tweet.querySelector('time').parentElement
  const permaLinkFromLink = $link.getAttribute('href')
  if (permaLinkFromLink) {
    permaLink = permaLinkFromLink
  }

  const isFocusViewTweet = $tweet.getAttribute('data-testid') === 'tweetDetail'

  return {
    permaLink,
    isFocusViewTweet
  }
}

/**
 * @param {Node} twitterActionListCotnainerElement
 * @param {Node} pocketIconButtonClone
 * Appends the pocket icon button to the twitter action list beside the share button
 */
export function addPocketIconToActionList({
  twitterActionListCotnainerElement,
  pocketIconButtonClone
}) {
  const shareAction = twitterActionListCotnainerElement.children[3]
  shareAction.after(pocketIconButtonClone)
  twitterActionListCotnainerElement.classList.add('PocketAdded')
}
