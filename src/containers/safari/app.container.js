// This file will act as a proxy for the store for now while we
// separate our the third party background proxy and try to unify
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Doorhanger from 'components/views/doorhanger/doorhanger'
import { appActions } from './app.state'
import { saveActions } from './save.state'

class SafariApp extends Component {
  state = {
    dropDownActive: false
  }

  get isSaveActive() {
    const { status } = this.props
    const validStatus = [
      'saving',
      'saved',
      'archiving',
      'archived',
      'removing',
      'error'
    ]
    const isActive = validStatus.indexOf(status) !== -1
    return isActive
  }

  setDropDownStatus = () => {
    this.setState(state => ({ dropDownActive: !state.dropDownActive }))
  }

  archiveItem = () => {
    const { type, item_id, archiveItem } = this.props
    archiveItem({ type, item_id })
  }

  removeItem = () => {
    const { type, item_id, removeItem } = this.props
    removeItem({ type, item_id })
  }

  render() {
    const { status, type, userLogOut } = this.props
    const { dropDownActive } = this.state
    const actions = {
      openPocket: () => {},
      openOptions: userLogOut,
      archiveItem: this.archiveItem,
      removeItem: this.removeItem
    }

    return (
      <Doorhanger
        tab_id={1}
        isSaveActive={this.isSaveActive}
        currentTab={{ status, type, dropDownActive }}
        setDropDownStatus={this.setDropDownStatus}
        {...actions}
      />
    )
  }
}
/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...appActions, ...saveActions }, dispatch)
}

function mapStateToProps(state) {
  const { status, type, item_id } = state.saves
  return { status, type, item_id }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SafariApp)
