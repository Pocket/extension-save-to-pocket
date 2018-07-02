import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToolbarMain } from 'Views/Toolbar/toolbar'

export class ToolbarContainer extends Component {
  render() {
    const { status, saveType } = this.props
    return <ToolbarMain status={status} saveType={saveType} />
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

function mapStateToProps(state) {
  const activeSave = state.saves[state.tab]
  return {
    status: activeSave.status,
    saveType: activeSave.saveType
  }
}

export const Toolbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarContainer)
