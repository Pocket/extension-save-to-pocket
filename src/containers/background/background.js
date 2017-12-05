import { Framer } from '../save/frame/framer'
import * as Interface from '../../common/interface'
import { isNewTab, getBaseUrl } from '../../common/helpers'
import { initializeStore } from '../../store/store'
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

setBrowserAction()
setTabListeners()

const pocketFrame = new Framer(store)
pocketFrame.watch()

/* MESSAGE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
Interface.addMessageListener((request, sender, sendResponse) => {
    if (request.action !== 'getTabId') return
    sendResponse(sender.tab.id)
    return true
})

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
            store.dispatch(
                info.linkUrl
                    ? saveUrlToPocket({ info, tab, from: 'context' })
                    : savePageToPocket({ info, tab, from: 'context' })
            )
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

function setBrowserAction() {
    Interface.browserAction().onClicked.addListener((tab, url) => {
        if (isNewTab(tab, url))
            return Interface.openUrl(getBaseUrl() + 'a/?s=ext_rc_open')
        store.dispatch(savePageToPocket({ tab, url, from: 'browserAction' }))
    })
}

function setTabListeners() {
    Interface.onTabActivated(activeInfo => {
        store.dispatch({ type: 'ACTIVE_TAB_CHANGED', tabInfo: activeInfo })
    })

    Interface.onTabUpdate((tabId, changeInfo) => {
        store.dispatch({
            type: 'ACTIVE_TAB_UPDATED',
            tabId,
            tabInfo: changeInfo
        })
    })

    Interface.onFocusChanged(() => {
        //windowId
        Interface.getCurrentTab(tab => {
            if (tab[0])
                store.dispatch({
                    type: 'ACTIVE_WINDOW_CHANGED',
                    tabId: tab[0].id
                })
        })
    })

    Interface.onTabRemoved((tabId, removeInfo) => {
        store.dispatch({ type: 'TAB_CLOSED', tabId, removeInfo: removeInfo })
    })
}
