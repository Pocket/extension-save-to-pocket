import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

import { PanelBase } from 'Elements/Foundations/foundation'

import RecommendationList from './list/list'
import Header from './header/header'

const RecommendationWrapper = styled('div')`
  ${PanelBase};
  margin-top: 10px;
  padding: 5px 0 0;
  position: relative;
  text-shadow: none !important;
  width: 320px;
`

export default class Recommendations extends Component {
  render() {
    return (
      <RecommendationWrapper>
        {Header(this.props.recs)}

        {this.props.recs && (
          <RecommendationList
            tabId={this.props.tabId}
            saveRecommendation={this.props.saveRecommendation}
            openRecommendation={this.props.openRecommendation}
            spocImpression={this.props.spocImpression}
            spocView={this.props.spocView}
            spocClick={this.props.spocClick}
            spocRemove={this.props.spocRemove}
            list={this.props.recs.feed}
          />
        )}
      </RecommendationWrapper>
    )
  }
}

Recommendations.propTypes = {
  item: PropTypes.object,
  recs: PropTypes.object,
  saveRec: PropTypes.func
}
