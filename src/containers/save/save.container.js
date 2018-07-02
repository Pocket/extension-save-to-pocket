import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Toolbar } from 'Containers/Save/Toolbar/toolbar.container'
import { saveActions } from './save.state'

export class SaveContainer extends Component {
  render() {
    return (
      <div
        onMouseEnter={this.props.cancelIdleTimer}
        onMouseLeave={this.props.startIdleTimer}>
        <Toolbar />
      </div>
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(saveActions, dispatch)
}

function mapStateToProps(state, ownProps) {
  return {}
}

export const SavePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveContainer)
