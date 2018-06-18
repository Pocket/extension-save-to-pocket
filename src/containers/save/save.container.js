import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class SaveContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <h1>Save Container</h1>
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

export const SavePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveContainer)
