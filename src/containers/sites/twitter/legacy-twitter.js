import styles from './legacy-twitter.scss' // Import Styles
import { addMessageListener, sendMessage } from 'common/interface'

const mutationConfig = {
  childList: true,
  attributes: false,
  characterData: false,
  subtree: true
}

// Set up Observer
const appObserver = new MutationObserver(appMutationHandler)
function appMutationHandler(mutationList) {
  for (var mutation of mutationList) {
    if (
      mutation.type === 'childList' &&
      (mutation.target.id === 'page-container' ||
        mutation.target.id === 'stream-items-id' ||
        mutation.target.id === 'permalink-overlay-body')
    ) {
      handleNewItems()
    }
  }
}

// Define Markup
const saveToPocketMarkup = `
<button class="ProfileTweet-actionButton u-textUserColorHover js-actionButton"
    type="button" data-nav="share_tweet_to_pocket">
    <div class="IconContainer js-tooltip" data-original-title="Save To Pocket">
        <span class="Icon Icon--medium Icon--saveToPocket">
            <svg class=${styles.pocketIcon}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1836 1836">
              <path d="M217.7,148.1A153.7,153.7,0,0,0,74.7,248.2,146.5,146.5,0,0,0,64,303.6V811L71.1,911a800.4,800.4,0,0,0,330.5,568.2l10.7,7.1H416a812.9,812.9,0,0,0,334.1,144.7,873.7,873.7,0,0,0,169.7,17.9,757.5,757.5,0,0,0,157.2-14.3l19.7-3.6a7.1,7.1,0,0,0,7.1-3.6,882.6,882.6,0,0,0,318-141.1h3.6l10.7-7.1a825.4,825.4,0,0,0,335.9-571.7l7.1-100.1V300a246.6,246.6,0,0,0-7.1-51.8,159,159,0,0,0-146.5-100.1h0M1400.4,778.8l-402,377a119.7,119.7,0,0,1-164.4,0l-398.4-377a116.1,116.1,0,0,1-3.6-162.6,119.7,119.7,0,0,1,164.4-3.6L916.2,916.4l319.8-303.7a119.7,119.7,0,0,1,164.4,3.6,112.6,112.6,0,0,1,5.4,159Z"/>
            </svg>
        </span>
        <span class="u-hiddenVisually">Save To Pocket</span>
    </div>
</button>
`
const saveToPocketButton = document.createElement('div')
saveToPocketButton.classList.add(
  'ProfileTweet-action',
  'ProfileTweet-action--stp'
)
saveToPocketButton.innerHTML = saveToPocketMarkup

// Start and Stop integration
function resolveCheck(integrate) {
  if (integrate) return startIntegration()
  stopIntegration()
}

function startIntegration() {
  appObserver.observe(document, mutationConfig)
  handleNewItems()
}

function stopIntegration() {
  appObserver.disconnect()
  const nodeList = document.querySelectorAll('div.ProfileTweet-action--stp')
  nodeList.forEach(e => e.parentNode.removeChild(e))
}

// Set Injections
function handleNewItems() {
  const tweetActionLists = document.querySelectorAll('.tweet:not(.PocketAdded)')
  if (!tweetActionLists.length) return

  Array.from(tweetActionLists, addPocketFunctionality)
}

function addPocketFunctionality(element) {
  const permaLink = element.getAttribute('data-permalink-path')
  const elementId = element.getAttribute('data-item-id')

  const buttonClone = saveToPocketButton.cloneNode(true)
  buttonClone.id = `pocketButton-${elementId}`
  buttonClone.addEventListener(
    'click',
    handleSave.bind(this, elementId, permaLink)
  )

  buttonClone.setAttribute('data-permalink-path', permaLink)
  buttonClone.setAttribute('data-item-id', elementId)

  const actionList = element.querySelector('.ProfileTweet-actionList')
  if (actionList) {
    actionList.appendChild(buttonClone)
    element.classList.add('PocketAdded')
  }
}

// Handle saving
function handleSave(elementId, permaLink) {
  sendMessage(
    null,
    { action: 'twitterSave', permaLink, elementId },
    resolveSave
  )
}

function resolveSave(data) {
  const elementId = data.saveObject.elementId
  const tweet = document.getElementById(`pocketButton-${elementId}`)
  tweet.classList.add(styles.saved)
}

function handleAction(action, sender, sendResponse) {
  if (action.type === 'twitterStop') {
    stopIntegration()
  }

  if (action.type === 'twitterStart') {
    startIntegration()
  }
}

addMessageListener(handleAction)

// Do we want twitter integration?
sendMessage(null, { action: 'twitterCheck' }, resolveCheck)
