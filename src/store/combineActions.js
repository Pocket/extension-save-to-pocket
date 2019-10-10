import { setupActions } from 'containers/webkit/_old/background/_setup'
import { tabsActions } from 'containers/webkit/_old/background/_tabs'
import { saveActions } from 'containers/webkit/_old/save/_save'
import { taggingActions } from 'containers/webkit/_old/save/toolbar/tagging/_tagging'
import { recommendationActions } from 'containers/webkit/_old/save/recommendations/_recommendations'
import { surveyActions } from 'containers/webkit/_old/save/survey/_survey'

const { setupExtension, toggleRecommendations, toggleSite } = setupActions

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

const { surveyRespond, surveyCancel } = surveyActions

export {
  setupExtension,
  toggleRecommendations,
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
  spocRemove,
  surveyRespond,
  surveyCancel
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
