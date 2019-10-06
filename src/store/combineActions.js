import { setupActions } from '../containers/background/_setup'
import { tabsActions } from '../containers/background/_tabs'
import { saveActions } from '../containers/save/_save'
import { taggingActions } from '../containers/save/toolbar/tagging/_tagging'
import { recommendationActions } from '../containers/save/recommendations/_recommendations'
import { surveyActions } from '../containers/save/survey/_survey'

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
  setTagInputFocus,
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
  setTagInputFocus,
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
