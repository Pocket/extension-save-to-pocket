import React, { useEffect } from 'react'
import { Toolbar } from 'views/doorhanger/toolbar/toolbar.main'
import posed, { PoseGroup } from 'react-pose'
import styled from '@emotion/styled'
import { mixin_fontBase } from 'common/styles/components'
import { withAutoHider } from 'modules/autohide/autohide.hoc'
import { usePrevious } from 'common/helpers'

const DoorHangerWrapper = styled.div`
  ${mixin_fontBase};
  font-size: 16px;
  position: fixed;
  right: 10px;
  top: 15px;
  width: 320px;
  z-index: 2147483647;
`

const LoadInOut = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 0,
    transition: {
      y: { type: 'spring', stiffness: 400, damping: 55 },
      opacity: { duration: 500 },
      default: { duration: 0 }
    }
  },
  exit: {
    y: -240,
    opacity: 0,
    transition: { duration: 250 }
  }
})

const DoorHanger = ({
  active,
  isSaveActive,
  inputFocused,
  hasTimedOut,
  beginTiming,
  startTimer,
  resetTimer,
  completeSave,
  currentTab,
  setup,
  tab_id,
  logOut,
  setDropDownStatus,
  openPocket,
  openOptions,
  archiveItem,
  removeItem,
  activateTag,
  deactivateTag,
  deactivateTags,
  addTag,
  closePanel,
  removeTag,
  removeTags,
  setInputFocusState,
  currentTags
}) => {
  const prevSaveActive = usePrevious(isSaveActive)
  const prevInputFocused = usePrevious(inputFocused)

  useEffect(() => {
    if (inputFocused !== prevInputFocused) {
      if (inputFocused) return resetTimer()
      if (startTimer) return startTimer()
    }

    if (hasTimedOut) {
      resetTimer()
      completeSave()
      return
    }

    if (isSaveActive === prevSaveActive) return

    if (isSaveActive && beginTiming) beginTiming()
  }, [
    inputFocused, prevInputFocused,
    isSaveActive, prevSaveActive,
    startTimer, resetTimer,
    completeSave,
    hasTimedOut, beginTiming
  ])

  const showing = isSaveActive && currentTab && !hasTimedOut
  const storedTags = setup ? setup.tags_stored : []

  const onHover = () => {
    resetTimer()
  }

  const offHover = () => {
    if (!inputFocused) startTimer()
  }

  return (
    <DoorHangerWrapper
      onMouseEnter={onHover}
      onMouseLeave={offHover}>
      <PoseGroup>
        {showing ? (
          <LoadInOut key="loadInOut">
            <Toolbar
              tabId={tab_id.toString()}
              logOut={logOut}
              setDropDownStatus={setDropDownStatus}
              openPocket={openPocket}
              openOptions={openOptions}
              archive={archiveItem}
              remove={removeItem}
              currentTab={currentTab}
              active={active}
              tags={currentTags}
              activateTag={activateTag}
              deactivateTag={deactivateTag}
              deactivateTags={deactivateTags}
              addTag={addTag}
              closePanel={closePanel}
              removeTag={removeTag}
              removeTags={removeTags}
              storedTags={storedTags}
              inputFocused={inputFocused}
              setInputFocusState={setInputFocusState}
            />
          </LoadInOut>
        ) : null}
      </PoseGroup>
    </DoorHangerWrapper>
  )
}

export default withAutoHider(DoorHanger)
