import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToolbarMain } from 'Views/Toolbar/toolbar'

export class ToolbarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <ToolbarMain status={'saving'} type={'page'} />
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

function mapStateToProps(state) {
  return {}
}

export const Toolbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarContainer)
