import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Toolbar } from 'Containers/Save/Toolbar/toolbar.container'

export class SaveContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar status={'saving'} type={'page'} />
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
