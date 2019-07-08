import $ from 'jquery'
import styles from './twitter.scss' // Import Styles
import { sendMessage } from '../../../common/interface'

// Define Markup
const saveToPocketMarkup = `
<div class="ProfileTweet-actionButton u-textUserColorHover js-actionButton ${styles.pocketIconContainer}"
    type="button" data-nav="share_tweet_to_pocket">
    <svg class=${styles.pocketIcon}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1836 1836">
        <path d="M217.7,148.1A153.7,153.7,0,0,0,74.7,248.2,146.5,146.5,0,0,0,64,303.6V811L71.1,911a800.4,800.4,0,0,0,330.5,568.2l10.7,7.1H416a812.9,812.9,0,0,0,334.1,144.7,873.7,873.7,0,0,0,169.7,17.9,757.5,757.5,0,0,0,157.2-14.3l19.7-3.6a7.1,7.1,0,0,0,7.1-3.6,882.6,882.6,0,0,0,318-141.1h3.6l10.7-7.1a825.4,825.4,0,0,0,335.9-571.7l7.1-100.1V300a246.6,246.6,0,0,0-7.1-51.8,159,159,0,0,0-146.5-100.1h0M1400.4,778.8l-402,377a119.7,119.7,0,0,1-164.4,0l-398.4-377a116.1,116.1,0,0,1-3.6-162.6,119.7,119.7,0,0,1,164.4-3.6L916.2,916.4l319.8-303.7a119.7,119.7,0,0,1,164.4,3.6,112.6,112.6,0,0,1,5.4,159Z"/>
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
  const $clone = $(pocketIconButtonClone)
  // add debug attribute
  $clone
    .attr({
      'data-permalink-path': permaLink
    })
    .addClass(isFocusViewTweet ? styles['focus-view'] : styles['list-view'])

  return pocketIconButtonClone
}

// Handle saving
export function handleSave(elementId, permaLink, event) {
  event.preventDefault()
  sendMessage(
    null,
    { action: 'twitterSave', elementId, permaLink },
    function resolveSave(data) {
      const elementId = data.saveObject.elementId
      const tweet = document.getElementById(elementId)
      tweet.classList.add(styles.saved)
    }
  )
}

export function getTweetInfo(twitterActionListCotnainerElement) {
  // Find the Tweet container
  const $tweet = $(twitterActionListCotnainerElement).closest('article')
  // Fetch the single time element, from there we can grab the href from the parent to get the screen name and status id.

  if($tweet.length === 0) {
    // This is legacy twitter, no article tag parent present!'
    throw Error('legacyTwitter')
  }

  let permaLink = window.location.pathname
  let isFocusViewTweet = true

  const $link = $tweet.find('time').parent()
  const permaLinkFromLink = $link.attr('href')
  if (permaLinkFromLink) {
    // if there is a $link with href, the tweet is not in focus but just part of the list view
    permaLink = permaLinkFromLink
    isFocusViewTweet = false
  }

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
  const $twitterActionListCotnainerElement = $(
    twitterActionListCotnainerElement
  )
  const $shareAction = $($twitterActionListCotnainerElement.children()[3])
  $shareAction.after(pocketIconButtonClone)
  $twitterActionListCotnainerElement.addClass('PocketAdded')
}
