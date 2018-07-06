import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Toolbar } from 'Containers/Save/Toolbar/toolbar.container'
import { Recommendations } from 'Containers/Save/Recommendations/recs.container'
import { saveActions } from './save.state'
import { SaveAnimation } from './save.animation'

export class SaveContainer extends Component {
  get showSubPanels() {
    const allowedStatus = ['saving', 'saved']
    return allowedStatus.includes(this.props.status)
  }

  get subPanels() {
    if (this.showSubPanels) {
      return (
        <React.Fragment>
          <Recommendations />
        </React.Fragment>
      )
    }
    return null
  }

  render() {
    return (
      <SaveAnimation status={this.props.status}>
        <div
          onMouseEnter={this.props.cancelIdleTimer}
          onMouseLeave={this.props.startIdleTimer}>
          <Toolbar />
          {this.subPanels}
        </div>
      </SaveAnimation>
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(saveActions, dispatch)
}

function mapStateToProps(state, ownProps) {
  const activeSave = state.saves[state.tab]
  return {
    tabId: state.tab,
    status: activeSave.status
  }
}

export const SavePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveContainer)
