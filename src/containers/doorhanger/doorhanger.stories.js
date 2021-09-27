import React from 'react'

import { storiesOf } from '@storybook/react'
import DoorHanger from './doorhanger'

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
  setInputFocusState: () => {}
}

storiesOf('Views | DoorHanger', module).add('show', () => (
  <DoorHanger
    isSaveActive={true}
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
  />
))
