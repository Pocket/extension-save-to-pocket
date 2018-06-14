import * as Interface from 'Common/interface'
import { isNewTab, getBaseUrl, isSystemPage } from 'Common/helpers'

/* SETUP
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// TODO: Talk to product and Switch this to a notification
Interface.onUpdateAvailable(() => Interface.reloadExtension())
Interface.setUninstallUrl('https://getpocket.com/chrome-exit-survey/')

setBrowserAction()
setTabListeners()

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
    console.log('Frame Loaded')
  }

  if (request.action === 'frameFocus') {
    console.log('Frame Focused')
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

/* Context Menus
–––––––––––––––––––––––––––––––––––––––––––––––––– */
Interface.contextMenus().removeAll(createContextMenus)

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
  console.log(tab, url)
}

function setTabListeners() {
  Interface.onTabActivated(activeInfo => {
    console.log(activeInfo)
  })

  Interface.onTabUpdate((tabId, changeInfo) => {
    // Checking frame to avoid invalidating on a Single Page App
    checkFrameLoaded(tabId).then(available => {
      if (changeInfo.status === 'loading' && changeInfo.url) {
        console.log('Tab Updated')
      }
    })
  })

  Interface.onFocusChanged(() => {
    Interface.getCurrentTab(tab => {
      if (tab[0]) {
        console.log('Window changed')
      }
    })
  })

  Interface.onTabRemoved((tabId, removeInfo) => {
    console.log('Tab Removed')
  })

  Interface.onTabReplaced((addedTabId, removedTabId) => {
    console.log('Tab Replaced')
  })
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
  Interface.executeScript(tab.id, { file: 'js/frame.bundle.js' }, callback)
}
