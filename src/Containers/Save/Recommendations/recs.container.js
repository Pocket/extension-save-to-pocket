import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RecommendationPanel } from 'Components/Views/Recommendations/recommendations'

export class RecommendationContainer extends Component {
  render() {
    const { recs, status } = this.props
    const noRecs = !Boolean(recs.length)
    const loading = status === 'loading'
    return (
      <RecommendationPanel items={recs} loading={loading} norecs={noRecs} />
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

function mapStateToProps(state) {
  const activeSave = state.recommendations[state.tab] || {}
  return {
    activeTabId: state.tab,
    recs: activeSave.recs || [],
    status: activeSave.status || null
  }
}

export const Recommendations = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationContainer)
