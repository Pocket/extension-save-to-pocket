import React, { Component } from 'react'
import Toolbar from './toolbar/toolbar.main'
import Recommendations from './recommendations/recommendations.main'
import Survey from './survey/survey.main'
import { TransitionMotion, spring, presets } from 'react-motion' //
import styled from '@emotion/styled'
import { mixin_fontBase } from '../../common/styles/components'

const SaveHanger = styled.div`
  ${mixin_fontBase}

  font-size: 16px;
  position: fixed;
  right: 10px;
  top: 15px;
  width: 320px;
  z-index: 2147483647;
`
class SaveContainer extends Component {
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
                  <SaveHanger
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
                      storedTags={this.props.setup.tags_stored}
                      inputFocused={this.props.inputFocused}
                      setInputFocusState={this.props.setInputFocusState}
                    />
                    {this.props.showRecs && !this.props.survey.show && (
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
                    {this.props.survey.show && (
                      <Survey
                        survey={this.props.survey}
                        surveyRespond={this.props.surveyRespond}
                        surveyCancel={this.props.surveyCancel}
                      />
                    )}
                  </SaveHanger>
                )
              })}
            </div>
          )
        }}
      </TransitionMotion>
    )
  }
}

export default SaveContainer
