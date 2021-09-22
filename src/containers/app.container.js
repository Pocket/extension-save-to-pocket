// This file will act as a proxy for the store for now while we
// separate our the third party background proxy and try to unify
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Doorhanger from 'components/views/doorhanger/doorhanger'
import { appActions } from './app.state'
import { saveActions } from './save.state'
import { tagActions } from './tags.state'

class ExtensionApp extends Component {
  state = {
    dropDownActive: false,
    inputFocused: false
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

  setInputFocusState = bool => {
    this.setState({ inputFocused: bool })
  }

  setDropDownStatus = (tabId, value) => {
    this.setState({ dropDownActive: value })
  }

  archiveItem = () => {
    const { type, item_id, archiveItem } = this.props
    archiveItem({ type, item_id })
  }

  removeItem = () => {
    const { type, item_id, removeItem } = this.props
    removeItem({ type, item_id })
    this.setState({ dropDownActive: false })
  }

  openPocket = () => {
    const { openPocket } = this.props
    this.setState({ dropDownActive: false })
    openPocket()
  }

  logOut = () => {
    const { userLogOut } = this.props
    this.setState({ dropDownActive: false })
    userLogOut()
  }

  render() {
    const { status, type, userLogOut } = this.props
    const { dropDownActive } = this.state

    const dropDownProps = {
      openPocket: this.openPocket,
      openOptions: userLogOut,
      archiveItem: this.archiveItem,
      removeItem: this.removeItem
    }

    const taggingProps = {
      activateTag: this.props.activateTag,
      deactivateTag: this.props.deactivateTag,
      deactivateTags: this.props.deactivateTags,
      addTag: this.props.addTag,
      removeTag: this.props.removeTag,
      removeTags: this.props.removeTags,
      inputFocused: this.state.inputFocused,
      setInputFocusState: this.setInputFocusState,
      setup: {
        tags_stored: this.props.tags_stored
      }
    }

    const currentTags = {
      suggested: this.props.suggested,
      used: this.props.used,
      marked: this.props.marked
    }

    return (
      <Doorhanger
        tab_id={1}
        logOut={this.logOut}
        // noSettings={true}
        isSaveActive={this.isSaveActive}
        currentTab={{ status, type, dropDownActive }}
        setDropDownStatus={this.setDropDownStatus}
        completeSave={this.props.completeSave}
        closePanel={this.props.completeSave}
        currentTags={currentTags}
        inputFocused={this.state.inputFocused}
        {...dropDownProps}
        {...taggingProps}
      />
    )
  }
}
/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...appActions, ...saveActions, ...tagActions },
    dispatch
  )
}

function mapStateToProps(state) {
  const { status, type, item_id } = state.saves
  const { suggested, used, marked, tags_stored } = state.tags
  return {
    status,
    type,
    item_id,
    suggested,
    used,
    marked,
    tags_stored
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtensionApp)
