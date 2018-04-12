/* Import CSS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import styles from './recommendations.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RecommendationList from './list/list'
import Header from './header/header'

export default class Recommendations extends Component {
  render() {
    return (
      <div className={styles.recommendations}>
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
      </div>
    )
  }
}

Recommendations.propTypes = {
  item: PropTypes.object,
  recs: PropTypes.object,
  saveRec: PropTypes.func
}
