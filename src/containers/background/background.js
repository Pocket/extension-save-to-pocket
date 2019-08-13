import frame from '../save/frame/frame'
import { Framer } from '../save/frame/framer'
import * as Interface from '../../common/interface'
import { isNewTab, getBaseUrl, isSystemPage } from '../../common/helpers'
import { initializeStore } from '../../store/store'
import { closeSavePanel } from '../../store/combineActions'
import { cancelCloseSavePanel } from '../../store/combineActions'
import { frameLoaded } from '../../store/combineActions'
import { setupExtension } from '../../store/combineActions'
import { hydrateState } from '../../store/combineActions'
import { savePageToPocket } from '../../store/combineActions'
import { saveUrlToPocket } from '../../store/combineActions'

const store = initializeStore()
const installed = Interface.getSetting('base_installed')
store.dispatch(installed ? hydrateState() : setupExtension())

// TODO: Switch this to a notification
Interface.onUpdateAvailable(() => Interface.reloadExtension())

Interface.setUninstallUrl('https://getpocket.com/chrome-exit-survey/')
Interface.setToolbarIcon(null, 'browser-action-icon')
Interface.onTabCreated(({ id: tabId }) =>
  setTimeout(() => {
    Interface.setToolbarIcon(tabId, 'browser-action-icon')
  }, 200)
)
// setBrowserAction() // not needed for safari
setTabListeners()

const pocketFrame = new Framer(store)
pocketFrame.watch()

/* MESSAGE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
Interface.addMessageListener((request, sender, sendResponse) => {
  if (request.action === 'getExtensionInfo') {
    Interface.getExtensionInfo().then(sendResponse)
    return true
  }

  if (request.action === 'getTabId') {
    sendResponse(sender.tab.id)
    return true
  }

  if (request.action === 'frameLoaded') {
    store.dispatch(frameLoaded(sender.tab.id))
  }

  if (request.action === 'frameFocus') {
    const state = store.getState()
    const isClosed =
      state.tabs &&
      state.tabs[sender.tab.id] &&
      state.tabs[sender.tab.id].status === 'idle'
    if (isClosed) return

    request.status
      ? store.dispatch(cancelCloseSavePanel({ tabId: sender.tab.id }))
      : store.dispatch(closeSavePanel({ tabId: sender.tab.id }))
  }

  if (request.action === 'twitterCheck') {
    const twitterState = store.getState()
    sendResponse(twitterState.setup && twitterState.setup.sites_twitter)
  }

  if (request.action === 'twitterSave') {
    store.dispatch({
      type: 'SAVE_TWEET_TO_POCKET',
      request,
      sendResponse
    })
    return true
  }
})

// Interface.contextMenus().removeAll(createContextMenus)

function createContextMenus() {
  Interface.contextMenus().create({
    title: 'Save To Pocket',
    contexts: [
      'page',
      'frame',
      'editable',
      'image',
      'video',
      'audio',
      'link',
      'selection'
    ],
    onclick: (info, tab) => {
      checkTabInjection(tab).then(response => {
        // Inject if there is no tab
        if (response !== 'tabAvailable') {
          return injectTab(tab, () => takeContextAction(info, tab))
        }

        //Otherwise carry on, all is well
        console.log('takeContextAction', { info, tab })
        takeContextAction(info, tab)
      })
    }
  })

  Interface.contextMenus().create({
    title: 'Open Your Pocket List',
    contexts: ['browser_action'],
    onclick: () => {
      Interface.openTabWithUrl(getBaseUrl() + 'a/?s=ext_rc_open')
    }
  })
}

function takeContextAction(info, tab) {
  store.dispatch(
    info.linkUrl
      ? saveUrlToPocket({ info, tab, from: 'context' })
      : savePageToPocket({ info, tab, from: 'context' })
  )
}

function setBrowserAction() {
  Interface.browserAction().onClicked.addListener((tab, url) => {
    if (isNewTab(tab, url) || isSystemPage(tab, url))
      return Interface.openUrl(getBaseUrl() + 'a/?s=ext_rc_open')

    checkTabInjection(tab).then(response => {
      // Inject if there is no tab
      if (response !== 'tabAvailable') {
        return injectTab(tab, () => {
          takeBrowserAction(tab, url)
        })
      }

      //Otherwise carry on, all is well
      takeBrowserAction(tab, url)
    })
  })
}

function takeBrowserAction(tab, url) {
  store.dispatch(savePageToPocket({ tab, url, from: 'browserAction' }))
}

function setTabListeners() {
  Interface.onTabActivated(activeInfo => {
    store.dispatch({ type: 'ACTIVE_TAB_CHANGED', tabInfo: activeInfo })
  })

  Interface.onTabUpdate((tabId, changeInfo) => {
    // Checking frame to avoid invalidating on a Single Page App
    checkFrameLoaded(tabId).then(available => {
      if (changeInfo.status === 'loading' && changeInfo.url) {
        store.dispatch({
          type: 'ACTIVE_TAB_UPDATED',
          tabId,
          frame: available ? 'loaded' : 'unloaded',
          tabInfo: changeInfo
        })
      }
    })
  })

  Interface.onFocusChanged(() => {
    Interface.getCurrentTab(tab => {
      if (tab[0])
        store.dispatch({
          type: 'ACTIVE_WINDOW_CHANGED',
          tabInfo: {
            tabId: tab[0].id
          }
        })
    })
  })

  Interface.onTabRemoved((tabId, removeInfo) => {
    store.dispatch({ type: 'TAB_CLOSED', tabId, removeInfo: removeInfo })
  })

  Interface.onTabReplaced((addedTabId, removedTabId) => {
    store.dispatch({ type: 'TAB_REPLACED', addedTabId, removedTabId })
  })

  window.safari.self.addEventListener(
    'message',
    ({ message: { name, message, headers, userInfo } }) => {
      console.log('swift message event', { name, message, userInfo })
      switch (name) {
        case 'apiRequestCallback_get':
          debugger
          console.log('get API Callback received')
          break
        case 'apiRequestCallback_oauth_authorize':
          debugger
          console.log('/oauth/is_valid_token API Callback received')
          break
        case 'apiRequestCallback_oauth_is_valid_token':
          debugger
          console.log('/oauth/is_valid_token API Callback received')
          break
        case 'clientAPICallback':
          console.log('API Callback received')
          break
        case 'toolbarItemClicked':
          console.log('toolbarItemClicked')
          frame()
          takeBrowserAction({}, window.location.href)
          break
        case 'executeScript':
          eval(message)
          break
        case '__performCb':
          // var cbId = message.cbId
          // var data = message.data
          // Callbacker.performCbFromIdWithData(data, cbId)
          break
        case 'isSafariContentAvailable':
          // safari.extension.dispatchMessage('safariContentAvailable', message)
          break
        default:
          break
      }
    }
  )
}

function checkFrameLoaded(tabId) {
  return new Promise(resolve => {
    Interface.sendMessageToTab(tabId, { type: 'checkFrame' }, resolve)
  })
}

function checkTabInjection(tab) {
  return new Promise(resolve => {
    Interface.sendMessageToTab(tab.id, { type: 'checkTab' }, resolve)
  })
}

function injectTab(tab, callback) {
  // Interface.executeScript(tab.id, { file: 'js/frame.bundle.js' }, callback)
  frame()
  callback()
}
