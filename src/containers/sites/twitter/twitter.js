import styles from './twitter.scss' // Import Styles
import { addMessageListener, sendMessage } from '../../../common/interface'
import { getTweetInfo } from './twitter-util'

const mutationConfig = {
  childList: true,
  attributes: false,
  characterData: false,
  subtree: true
}

// Set up Observer
const appObserver = new MutationObserver(appMutationHandler)
function appMutationHandler(mutationList) {
  for (let mutation of mutationList) {
    const { type, target: { tagName }} = mutation
    if (
      type === 'childList'
      && tagName === 'DIV'
      // TODO: find specific condition for updated tweets
      // && (mutation.target.attributes.role && mutation.target.attributes.role.value === 'main')
    ) {
      handleNewItems()
    }
  }
}

/* Desired DOM structure:
/*
        <div class="css-1dbjc4n r-1iusvr4 r-18u37iz r-16y2uox r-1h0z5md">
           <div aria-haspopup="true" aria-label="18 Retweets. Retweet" role="button" data-focusable="true" tabindex="0" class="css-18t94o4 css-1dbjc4n r-1777fci r-11cpok1 r-bztko3 r-lrvibr" data-testid="retweet">
              <div dir="ltr" class="css-901oao r-1awozwy r-1re7ezh r-6koalj r-1qd0xha r-a023e6 r-16dba41 r-1h0z5md r-ad9z0x r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0">
                 <div class="css-1dbjc4n r-xoduu5">
                    <div class="css-1dbjc4n r-sdzlij r-1p0dtai r-xoduu5 r-1d2f490 r-xf4iuw r-u8s1d r-zchlnj r-ipm5af r-o7ynqc r-6416eg"></div>
                    <svg viewBox="0 0 24 24" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                       <g>
                          <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                       </g>
                    </svg>
                 </div>
                 <div class="css-1dbjc4n r-xoduu5 r-1udh08x"><span dir="auto" class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-1n0xq6e r-bcqeeo r-d3hbe1 r-1wgg2b2 r-axxi2z r-qvutc0"><span dir="auto" class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0">18</span></span></div>
              </div>
           </div>
        </div>
*/
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
  const tweetActionLists = document.querySelectorAll('[role=group]:not(.PocketAdded)')
  if (!tweetActionLists.length) return

  Array.from(tweetActionLists, addPocketFunctionality)
}

function addPocketFunctionality(tweetActionElement) {
  const { permaLink, element } = getTweetInfo(tweetActionElement)
  const elementId = Math.random().toString(36).substring(7)
  element.id = elementId

  const buttonClone = saveToPocketButton.cloneNode(true)
  buttonClone.id = `pocketButton-${elementId}`
  buttonClone.addEventListener(
    'click',
    handleSave.bind(this, elementId, permaLink)
  )

  buttonClone.setAttribute('data-permalink-path', permaLink)
  buttonClone.setAttribute('data-item-id', elementId)

  const actionList = tweetActionElement
  if (actionList) {
    actionList.appendChild(buttonClone)
    tweetActionElement.classList.add('PocketAdded')
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
