import React from 'react'

import { storiesOf } from '@storybook/react'
import SaveContainer from './save.container'

const props = {
  isSaveActive: () => {},
  onHover: () => {},
  offHover: () => {},
  state: {
    inputFocused: true
  },
  tab_id: 1,
  currentTab: {
    status: 'saving'
  },
  setDropDownStatus: () => {},
  openPocket: () => {},
  openOptions: () => {},
  archiveItem: () => {},
  removeItem: () => {},
  active: true,
  currentTags: [],
  addTag: () => {},
  removeTag: () => {},
  removeTags: () => {},
  setup: () => {},
  activateTag: () => {},
  deactivateTag: () => {},
  inputFocused: () => {},
  setInputFocusState: () => {},
  currentRecs: () => {},
  saveRecommendation: () => {},
  openRecommendation: () => {},
  spocClick: () => {},
  spocImpression: () => {},
  spocView: () => {},
  spocRemove: () => {},
  survey: () => {},
  surveyRespond: () => {},
  surveyCancel: () => {}
}
storiesOf('Save | Container', module).add('show save container', () => (
  <SaveContainer
    isSaveActive={props.isSaveActive()}
    showRecs={props.showRecs}
    onHover={props.onHover}
    offHover={props.offHover}
    tab_id={props.tab_id}
    currentTab={props.currentTab}
    setDropDownStatus={props.setDropDownStatus}
    openPocket={props.openPocket}
    openOptions={props.openOptions}
    archiveItem={props.archiveItem}
    removeItem={props.removeItem}
    active={props.active}
    currentTags={props.currentTags}
    activateTag={props.activateTag}
    deactivateTag={props.deactivateTag}
    deactivateTags={props.deactivateTags}
    addTag={props.addTag}
    closePanel={props.closePanel}
    removeTag={props.removeTag}
    removeTags={props.removeTags}
    setup={props.setup}
    inputFocused={props.state.inputFocused}
    setInputFocusState={props.setInputFocusState}
    currentRecs={props.currentRecs}
    saveRecommendation={props.saveRecommendation}
    openRecommendation={props.openRecommendation}
    spocImpression={props.spocImpression}
    spocView={props.spocView}
    spocClick={props.spocClick}
    spocRemove={props.spocRemove}
    survey={props.survey}
    surveyRespond={props.surveyRespond}
    surveyCancel={props.surveyCancel}
  />
))
