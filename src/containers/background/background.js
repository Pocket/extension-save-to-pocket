import * as Interface from 'Common/interface'
import { isNewTab, getBaseUrl, isSystemPage } from 'Common/helpers'
import { activeTabActions } from 'Containers/Background/tab.active.state'
import { store } from 'store'

/* SETUP
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// TODO: Talk to product and Switch this to a notification
Interface.onUpdateAvailable(() => Interface.reloadExtension())
Interface.setUninstallUrl('https://getpocket.com/chrome-exit-survey/')

setBrowserAction()
setContextMenus()
setTabListeners()

/* Context Menus
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function setContextMenus() {
  Interface.contextMenus().removeAll(createContextMenus)
}

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
  console.log(info, tab)
}

/* Browser Actions
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function setBrowserAction() {
  Interface.browserAction().onClicked.addListener((tab, url) => {
    // If we are not on a valid page type
    if (isNewTab(tab, url) || isSystemPage(tab, url))
      return Interface.openUrl(getBaseUrl() + 'a/?s=ext_rc_open')

    checkTabInjection(tab).then(response => {
      // Inject if there is no tab
      if (response !== 'tabAvailable') {
        return injectTab(tab, () => takeBrowserAction(tab, url))
      }
      //Otherwise carry on, all is well
      takeBrowserAction(tab, url)
    })
  })
}

function takeBrowserAction(tab, url) {
  console.log({ tab, url })
}

/* INCOMING MESSAGESt
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
    console.log('Frame Loaded')
  }

  if (request.action === 'frameFocus') {
    console.log('Frame Focused', request.status)
  }

  if (request.action === 'frameResized') {
    Interface.sendMessageToTab(sender.tab.id, {
      type: 'frameResize',
      height: request.height
    })
  }

  if (request.action === 'twitterCheck') {
    console.log('Checking Twitter')
  }

  if (request.action === 'twitterSave') {
    console.log('Twitter Save')
    return true
  }
})

/* Tabs
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function setTabListeners() {
  const {
    activeTabChanged,
    activeTabUpdated,
    activeWindowChanged,
    tabRemoved,
    tabReplaced
  } = activeTabActions

  Interface.onTabActivated(activeInfo => {
    store.dispatch(activeTabChanged(activeInfo))
  })

  Interface.onTabUpdate((tabId, changeInfo) => {
    // Checking frame to avoid invalidating on a Single Page App
    checkFrameLoaded(tabId).then(available => {
      if (changeInfo.status === 'loading' && changeInfo.url) {
        const frame = available ? 'loaded' : 'unloaded'
        store.dispatch(activeTabUpdated({ tabId, frame, changeInfo }))
      }
    })
  })

  Interface.onFocusChanged(() => {
    Interface.getCurrentTab(tab => {
      if (tab[0]) store.dispatch(activeWindowChanged({ tabId: tab[0].id }))
    })
  })

  Interface.onTabRemoved((tabId, removeInfo) => {
    store.dispatch(tabRemoved({ tabId, removeInfo }))
  })

  Interface.onTabReplaced((tabId, removedTabId) => {
    store.dispatch(tabReplaced({ tabId, removedTabId }))
  })
}

/* Frames
–––––––––––––––––––––––––––––––––––––––––––––––––– */
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
  Interface.executeScript(tab.id, { file: 'js/frame.bundle.js' }, callback)
}
