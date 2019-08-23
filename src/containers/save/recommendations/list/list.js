import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring, presets } from 'react-motion'
import RecommendationItem from './item'
import RecommendationSpoc from './spoc'
import styled from '@emotion/styled'
import { TYPOGRAPHY } from '../../../../common/styles/variables'
const { $fontstackDefault } = TYPOGRAPHY

const ListWrapper = styled.li`
  all: unset;
  display: block;
  font-family: ${$fontstackDefault};
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: left;
`
export default class RecommendationList extends Component {
  // actual animation-related logic
  getDefaultStyles = () => {
    return this.props.list.map(rec => {
      return {
        ...rec,
        data: rec,
        key: 'id' + rec.id,
        style: { height: 0, opacity: 0 }
      }
    })
  }

  getStyles = () => {
    return this.props.list.map(rec => {
      const recHeight = rec.isSpoc ? 140 : 110
      return {
        ...rec,
        data: rec,
        key: 'id' + rec.id,
        style: {
          height: spring(recHeight, { stiffness: 150, damping: 14 }),
          opacity: spring(1, presets.stiff)
        }
      }
    })
  }

  willEnter() {
    return { height: 0, opacity: 0 }
  }
  willLeave() {
    return { height: spring(0), opacity: spring(0) }
  }

  render() {
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willLeave={this.willLeave}
        willEnter={this.willEnter}>
        {interpolatedStyles => (
          <ListWrapper>
            {interpolatedStyles.map((config, index) => {
              return config.data.isSpoc ? (
                <RecommendationSpoc
                  motionStyle={config.style}
                  key={config.key}
                  item={config.data}
                  position={index}
                  openRecommendation={this.props.openRecommendation}
                  saveRecommendation={this.props.saveRecommendation}
                  spocImpression={this.props.spocImpression}
                  spocView={this.props.spocView}
                  spocClick={this.props.spocClick}
                  spocRemove={this.props.spocRemove}
                  tabId={this.props.tabId}
                />
              ) : (
                <RecommendationItem
                  motionStyle={config.style}
                  key={config.key}
                  item={config.data}
                  position={index}
                  openRecommendation={this.props.openRecommendation}
                  saveRecommendation={this.props.saveRecommendation}
                  spocImpression={this.props.spocImpression}
                  spocView={this.props.spocView}
                  spocClick={this.props.spocClick}
                  spocRemove={this.props.spocRemove}
                  tabId={this.props.tabId}
                />
              )
            })}
          </ListWrapper>
        )}
      </TransitionMotion>
    )
  }
}

RecommendationList.propTypes = {
  list: PropTypes.array,
  recs: PropTypes.object,
  saveRec: PropTypes.func
}
