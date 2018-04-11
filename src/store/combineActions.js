import { setupActions } from '../containers/background/_setup'
import { tabsActions } from '../containers/background/_tabs'
import { saveActions } from '../containers/save/_save'
import { taggingActions } from '../containers/save/toolbar/tagging/_tagging'
import { recommendationActions } from '../containers/save/recommendations/_recommendations'

const { setupExtension, toggleRecommendations, toggleAutoFocus, toggleSite } = setupActions

const { frameLoaded, setTabStatus, setDropDownStatus } = tabsActions

const {
    savePageToPocket,
    saveUrlToPocket,
    removeItem,
    archiveItem,
    closeSavePanel,
    cancelCloseSavePanel
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

const {
    saveRecommendation,
    openRecommendation,
    spocImpression,
    spocView,
    spocClick,
    spocRemove
} = recommendationActions

export {
    setupExtension,
    toggleRecommendations,
    toggleAutoFocus,
    toggleSite,
    frameLoaded,
    setTabStatus,
    setDropDownStatus,
    savePageToPocket,
    saveUrlToPocket,
    removeItem,
    archiveItem,
    closeSavePanel,
    cancelCloseSavePanel,
    getTags,
    activateTag,
    deactivateTag,
    addTag,
    removeTag,
    deactivateTags,
    removeTags,
    saveRecommendation,
    openRecommendation,
    spocImpression,
    spocView,
    spocClick,
    spocRemove
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
