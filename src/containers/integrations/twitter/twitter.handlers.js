/* global chrome */
import { TWITTER_SAVE_REQUEST } from 'actions'
import { saveButtonElement } from './twitter.ui'

const saveToPocketButton = saveButtonElement()

export function pageMutationHandler() {
  addPocketButtons()
}

export function removePocketButtons() {
  const nodeList = document.querySelectorAll('div.saveToPocketButton')
  nodeList.forEach(e => e.parentNode.removeChild(e))
}

export function addPocketButtons() {
  const actionLists = document.querySelectorAll(
    '[role=group]:not(.PocketAdded)'
  )

  if (!actionLists && actionLists.length) return

  try {
    Array.from(actionLists, addPocketFunctionality)
  } catch ({ message }) {
    if (message !== 'legacyTwitter') console.warn(message)
  }
}

function addPocketFunctionality(actionListContainer) {
  const { permaLink, isFocusViewTweet } = getTweetInfo(actionListContainer)
  const pocketButton = getPocketButtonClone({
    permaLink,
    isFocusViewTweet
  })
  // add save handler to each pocket icon
  pocketButton.addEventListener(
    'click',
    handleSave.bind(this, pocketButton.id, permaLink)
  )
  // add save to pocket button to the twitter action list container
  addPocketIconToActionList(actionListContainer, pocketButton)
}

/**
 * @param {Node} actionListContainer
 * @param {Node} pocketButton
 * Appends the pocket icon button to the twitter action list beside the share button
 */
function addPocketIconToActionList(actionListContainer, pocketButton) {
  const shareAction = actionListContainer.children[3]
  shareAction.before(pocketButton)
  actionListContainer.classList.add('PocketAdded')
}

// returns a cloned save to pocket button
export function getPocketButtonClone({ permaLink, isFocusViewTweet }) {
  const pocketIconButtonClone = saveToPocketButton.cloneNode(true)
  // the id is used in the resolve save event to find the element and apply styles to it
  pocketIconButtonClone.id = `pocketButton-${Math.random()
    .toString(36)
    .substring(7)}`
  pocketIconButtonClone.setAttribute('data-permalink-path', permaLink)
  pocketIconButtonClone.classList.add(
    isFocusViewTweet ? 'focus-view' : 'list-view'
  )

  return pocketIconButtonClone
}

/* Other Things
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function markSaved(message) {
  const { elementId } = message
  const saved = document.getElementById(elementId)
  if (!saved) return

  saved.classList.add('savedToPocket')
}

// Handle saving
export function handleSave(elementId, permaLink, event) {
  event.stopPropagation()
  event.stopImmediatePropagation()
  event.preventDefault()
  const article = document.getElementById(elementId).closest('article')
  const tweetLink = getTweetLink(article)

  chrome.runtime.sendMessage({
    type: TWITTER_SAVE_REQUEST,
    payload: { elementId, permaLink, tweetLink }
  })
}

export function getTweetLink(article) {
  // !! This does not handle multiple links in a tweet
  // !! so it would be better to let the backend handle this.

  // Find various links in the tweet
  const linkInBody = article.querySelector('[lang] > a')
  const linkInLabel = article.querySelector('#tweet-rich-content-label a')

  // Get the most pertinent tweet
  const link = linkInBody
    ? linkInBody.getAttribute('href')
    : linkInLabel
    ? linkInLabel.getAttribute('href')
    : false

  const isExternalLink = link && link.match(/https?:/i)

  return isExternalLink ? link : false
}

export function getTweetInfo(twitterActionListCotnainerElement) {
  // Page link is last resort
  const pageLink = window.location.pathname

  // Find the Tweet container
  const tweet = twitterActionListCotnainerElement.closest('article')

  // This is legacy twitter, no article tag parent present!'
  if (tweet && tweet.length === 0) throw Error('legacyTwitter')

  // Fetch the single time element, from there we can grab the href from the
  // parent to get the screen name and status id.

  const time = tweet.querySelector('time')
  const timeContainer = time ? time.parentElement : false
  const timeLink = timeContainer ? timeContainer.getAttribute('href') : false
  const permaLink = timeLink ? `https://twitter.com${timeLink}` : pageLink
  const isFocusViewTweet = tweet.getAttribute('data-testid') === 'tweetDetail'

  return {
    permaLink,
    isFocusViewTweet
  }
}
