import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Doorhanger from 'components/views/doorhanger/doorhanger'
import { openPocket, userLogOut } from './app.state'
import { archiveItem, removeItem, completeSave } from './save.state'
import { addTag, activateTag, deactivateTag, deactivateTags, removeTag, removeTags } from './tags.state'

export const ExtensionApp = () => {
  const dispatch = useDispatch()

  const { status, type, item_id } = useSelector((state) => state.saves)
  const { suggested, used, marked, tags_stored } = useSelector((state) => state.tags)

  const [dropDownActive, setDropDownActive] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)

  const isSaveActive = () => {
    const validStatus = [
      'saving',
      'saved',
      'archiving',
      'archived',
      'removing',
      'error'
    ]
    const isActive = validStatus.indexOf(status) !== -1
    return isActive
  }

  const setInputFocusState = (bool) => {
    setInputFocused(bool)
  }

  const setDropDownStatus = (tabId, value) => {
    setDropDownActive(value)
  }

  const archiveItemAction = () => {
    dispatch(archiveItem({ type, item_id }))
  }

  const removeItemAction = () => {
    dispatch(removeItem({ type, item_id }))
    setDropDownActive(false)
  }

  const completeSaveAction = () => dispatch(completeSave())

  const openPocketAction = () => {
    setDropDownActive(false)
    dispatch(openPocket())
  }

  const logOutAction = () => {
    setDropDownActive(false)
    dispatch(userLogOut())
  }

  const activateTagAction = (payload) => dispatch(activateTag(payload))
  const deactivateTagAction = (payload) => dispatch(deactivateTag(payload))
  const deactivateTagsAction = (payload) => dispatch(deactivateTags(payload))
  const addTagAction = (tag) => dispatch(addTag(tag))
  const removeTagAction = (payload) => dispatch(removeTag(payload))
  const removeTagsAction = (payload) => dispatch(removeTags(payload))

  const dropDownProps = {
    openPocket: openPocketAction,
    openOptions: logOutAction,
    archiveItem: archiveItemAction,
    removeItem: removeItemAction
  }

  const taggingProps = {
    activateTag: activateTagAction,
    deactivateTag: deactivateTagAction,
    deactivateTags: deactivateTagsAction,
    addTag: addTagAction,
    removeTag: removeTagAction,
    removeTags: removeTagsAction,
    inputFocused: inputFocused,
    setInputFocusState: setInputFocusState,
    setup: {
      tags_stored: tags_stored
    }
  }

  const currentTags = {
    suggested: suggested,
    used: used,
    marked: marked
  }

  return (
    <Doorhanger
      tab_id={1}
      logOut={logOutAction}
      isSaveActive={isSaveActive()}
      currentTab={{ status, type, dropDownActive }}
      setDropDownStatus={setDropDownStatus}
      completeSave={completeSaveAction}
      closePanel={completeSaveAction}
      currentTags={currentTags}
      inputFocused={inputFocused}
      {...dropDownProps}
      {...taggingProps}
    />
  )
}
