// ACTIONS
export const tabsActions = {
    setTabStatus: (tabId, status) => ({
        type: 'SET_TAB_STATUS',
        tabId,
        status
    }),
    setDropDownStatus: (tabId, status) => ({
        type: 'SET_DROPDOWN_STATUS',
        tabId,
        status
    })
}

// REDUCERS
export const active = (state = 0, action) => {
    switch (action.type) {
        case 'REQUEST_SAVE_TO_POCKET': {
            return action.tabId
        }
        case 'ACTIVE_TAB_CHANGED': {
            return action.tabInfo.tabId
        }
        case 'ACTIVE_WINDOW_CHANGED': {
            return action.tabId
        }
        default:
            return state
    }
}

export const tabs = (state = 0, action) => {
    switch (action.type) {
        case 'ACTIVE_TAB_CHANGED':
        case 'ACTIVE_TAB_UPDATED':
        case 'ACTIVE_WINDOW_CHANGED': {
            return { ...state, ...setTabsIdle(state) }
        }

        case 'SET_TAB_STATUS': {
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    status: action.status
                }
            }
        }

        case 'SET_DROPDOWN_STATUS': {
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    dropDownActive: action.status
                }
            }
        }

        case 'TAB_CLOSED': {
            const filteredState = Object.keys(state)
                .filter(key => parseInt(key, 10) !== action.tabId)
                .reduce((accumulator, key) => {
                    accumulator[key] = state[key]
                    return accumulator
                }, {})
            return filteredState
        }

        case 'REQUEST_SAVE_TO_POCKET': {
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    type: action.saveType,
                    status: 'saving',
                    dropDownActive: false
                }
            }
        }

        case 'SAVE_TO_POCKET_SUCCESS': {
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    status: 'saved',
                    hash: action.saveHash
                }
            }
        }

        case 'SAVE_TO_POCKET_FAILURE': {
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    status: 'error'
                }
            }
        }

        case 'ITEM_REMOVE_REQUEST': {
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    status: 'removing'
                }
            }
        }

        case 'ITEM_REMOVED': {
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    status: 'removed'
                }
            }
        }

        case 'ITEM_ARCHIVE_REQUEST': {
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    status: 'archiving'
                }
            }
        }

        case 'ITEM_ARCHIVED': {
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    status: 'archived'
                }
            }
        }

        default:
            return state
    }
}

function setTabsIdle(tabs) {
    let idleTabs = {}
    Object.keys(tabs).map(key => {
        idleTabs[key] = Object.assign({}, tabs[key], {
            ...tabs[key],
            status: 'idle',
            dropDownActive: false
        })
        return null
    })
    return idleTabs || {}
}
