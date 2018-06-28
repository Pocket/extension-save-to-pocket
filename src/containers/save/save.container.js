import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Toolbar } from 'Containers/Save/Toolbar/toolbar.container'

export class SaveContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar />
      </React.Fragment>
    )
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
