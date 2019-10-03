import { addMessageListener, sendMessage } from 'common/interface'
import {
  handleSave,
  getTweetInfo,
  getPocketButtonClone,
  addPocketIconToActionList
} from './twitter-util'

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
    const {
      type,
      target: { tagName }
    } = mutation
    if (
      type === 'childList' &&
      tagName === 'DIV'
      // TODO: find specific condition for updated tweets
      // && (mutation.target.attributes.role && mutation.target.attributes.role.value === 'main')
    ) {
      handleNewItems()
    }
  }
}

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

function handleNewItems() {
  const tweetActionLists = document.querySelectorAll(
    '[role=group]:not(.PocketAdded)'
  )
  if (!tweetActionLists.length) return
  try {
    Array.from(tweetActionLists, addPocketFunctionality)
  } catch ({ message }) {
    if (message !== 'legacyTwitter') {
      console.warn(message)
    }
  }
}

// inject pocket icon among twitter action elements in the tweet action list container
function addPocketFunctionality(twitterActionListCotnainerElement) {
  const { permaLink, isFocusViewTweet } = getTweetInfo(
    twitterActionListCotnainerElement
  )
  const pocketIconButtonClone = getPocketButtonClone({
    permaLink,
    isFocusViewTweet
  })
  // add save handler to each pocket icon
  pocketIconButtonClone.addEventListener(
    'click',
    handleSave.bind(this, pocketIconButtonClone.id, permaLink)
  )
  // add save to pocket button to the twitter action list container
  addPocketIconToActionList({
    twitterActionListCotnainerElement,
    pocketIconButtonClone
  })
}

function handleAction(action) {
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
