import React, { Component } from 'react'
import Toolbar from 'views/doorhanger/toolbar/toolbar.main'
import Recommendations from 'views/doorhanger/recommendations/recommendations'
import Survey from 'views/doorhanger/survey/survey.main'
import posed, { PoseGroup } from 'react-pose'
import styled from '@emotion/styled'
import { mixin_fontBase } from 'common/styles/components'
import { withAutoHider } from 'modules/autohide/autohide.hoc'

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
      y: { type: 'spring', stiffness: 400, damping: 35 },
      default: { duration: 500 }
    }
  },
  exit: {
    y: -240,
    opacity: 0,
    transition: { duration: 250 }
  }
})

class DoorHanger extends Component {
  componentDidUpdate(prevProps) {
    const { isSaveActive, hasTimedOut, inputFocused } = this.props
    const { beginTiming, startTimer, resetTimer, completeSave } = this.props

    if (inputFocused !== prevProps.inputFocused) {
      if (inputFocused) return resetTimer()
      if (startTimer) return startTimer()
    }

    if (hasTimedOut) {
      resetTimer()
      completeSave()
      return
    }

    if (isSaveActive === prevProps.isSaveActive) return

    if (isSaveActive && beginTiming) beginTiming()
  }

  get showing() {
    const { isSaveActive, currentTab, hasTimedOut } = this.props
    return isSaveActive && currentTab && !hasTimedOut
  }

  get storedTags() {
    return this.props.setup ? this.props.setup.tags_stored : []
  }

  get showSurvey() {
    return this.props.survey ? this.props.survey.show : false
  }

  onHover = () => {
    this.props.resetTimer()
  }

  offHover = () => {
    const { inputFocused } = this.props
    if (!inputFocused) this.props.startTimer()
  }

  render() {
    return (
      <DoorHangerWrapper
        onMouseEnter={this.onHover}
        onMouseLeave={this.offHover}>
        <PoseGroup>
          {this.showing && [
            <LoadInOut key="loadInOut">
              <Toolbar
                tabId={this.props.tab_id.toString()}
                noSettings={this.props.noSettings}
                logOut={this.props.logOut}
                setDropDownStatus={this.props.setDropDownStatus}
                openPocket={this.props.openPocket}
                openOptions={this.props.openOptions}
                archive={this.props.archiveItem}
                remove={this.props.removeItem}
                currentTab={this.props.currentTab}
                active={this.props.active}
                tags={this.props.currentTags}
                activateTag={this.props.activateTag}
                deactivateTag={this.props.deactivateTag}
                deactivateTags={this.props.deactivateTags}
                addTag={this.props.addTag}
                closePanel={this.props.closePanel}
                removeTag={this.props.removeTag}
                removeTags={this.props.removeTags}
                storedTags={this.storedTags}
                inputFocused={this.props.inputFocused}
                setInputFocusState={this.props.setInputFocusState}
              />
              {this.props.showRecs && !this.showSurvey && (
                <Recommendations
                  tabId={this.props.tab_id}
                  recs={this.props.currentRecs}
                  saveRecommendation={this.props.saveRecommendation}
                  openRecommendation={this.props.openRecommendation}
                  spocImpression={this.props.spocImpression}
                  spocView={this.props.spocView}
                  spocClick={this.props.spocClick}
                  spocRemove={this.props.spocRemove}
                />
              )}
              {this.showSurvey && (
                <Survey
                  survey={this.props.survey}
                  surveyRespond={this.props.surveyRespond}
                  surveyCancel={this.props.surveyCancel}
                />
              )}
            </LoadInOut>
          ]}
        </PoseGroup>
      </DoorHangerWrapper>
    )
  }
}

export default withAutoHider(DoorHanger)
