import { setupActions } from '../containers/background/_setup'
import { tabsActions } from '../containers/background/_tabs'
import { saveActions } from '../containers/save/_save'
import { taggingActions } from '../containers/save/toolbar/tagging/_tagging'
import { recommendationActions } from '../containers/save/recommendations/_recommendations'

const { setupExtension, toggleRecommendations, toggleSite } = setupActions

const { setTabStatus, setDropDownStatus } = tabsActions

const {
    savePageToPocket,
    saveUrlToPocket,
    removeItem,
    archiveItem
} = saveActions

const {
    getTags,
    activateTag,
    deactivateTag,
    addTag,
    removeTag,
    deactivateTags,
    removeTags
} = taggingActions

const { saveRecommendation } = recommendationActions

export {
    setupExtension,
    toggleRecommendations,
    toggleSite,
    setTabStatus,
    setDropDownStatus,
    savePageToPocket,
    saveUrlToPocket,
    removeItem,
    archiveItem,
    getTags,
    activateTag,
    deactivateTag,
    addTag,
    removeTag,
    deactivateTags,
    removeTags,
    saveRecommendation
}

export function openPocket() {
    return { type: 'OPEN_POCKET' }
}
export function openOptions() {
    return { type: 'OPEN_OPTIONS' }
}
export function hydrateState() {
    return { type: 'HYDRATE_STATE' }
}
