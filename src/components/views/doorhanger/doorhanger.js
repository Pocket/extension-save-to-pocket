import React, { Component } from 'react'
import Toolbar from 'views/doorhanger/toolbar/toolbar.main'
import Recommendations from 'views/doorhanger/recommendations/recommendations'
import Survey from 'views/doorhanger/survey/survey.main'
import { TransitionMotion, spring, presets } from 'react-motion' //
import styled from '@emotion/styled'
import { mixin_fontBase } from 'common/styles/components'

const DoorHangerWrapper = styled.div`
  ${mixin_fontBase};
  font-size: 16px;
  position: fixed;
  right: 10px;
  top: 15px;
  width: 320px;
  z-index: 2147483647;
`

class DoorHanger extends Component {
  getDefaultStyles = () => {
    return [
      {
        data: {},
        key: 'toolbar',
        style: {
          transform: -240,
          opacity: 0
        }
      }
    ]
  }

  getStyles = () => {
    return this.props.isSaveActive && this.props.currentTab
      ? [
          {
            data: {},
            key: 'toolbar',
            style: {
              transform: spring(0, { stiffness: 350, damping: 25 }),
              opacity: spring(1, presets.stiff)
            }
          }
        ]
      : []
  }

  willEnter() {
    return { transform: -240, opacity: 0 }
  }
  willLeave() {
    return { transform: spring(-240), opacity: spring(0) }
  }

  get storedTags() {
    return this.props.setup ? this.props.setup.tags_stored : []
  }

  get showSurvey() {
    return this.props.survey ? this.props.survey.show : false
  }

  render() {
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {items => {
          return (
            <div>
              {items.map(item => {
                return (
                  <DoorHangerWrapper
                    onMouseEnter={this.props.onHover}
                    onMouseLeave={this.props.offHover}
                    key={item.key}
                    style={{
                      transform: `translateY(${item.style.transform}%) translateZ(0)`,
                      transformStyle: 'preserve-3d',
                      opacity: item.style.opacity
                    }}>
                    <Toolbar
                      tabId={this.props.tab_id}
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
                  </DoorHangerWrapper>
                )
              })}
            </div>
          )
        }}
      </TransitionMotion>
    )
  }
}

export default DoorHanger
