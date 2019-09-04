// This file will act as a proxy for the store for now while we
// separate our the third party background proxy and try to unify
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Doorhanger from 'components/views/doorhanger/doorhanger'
import { appActions } from './app.state'
import { saveActions } from './save.state'
import { tagActions } from './tags.state'

class SafariApp extends Component {
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
    const { status, type, userLogOut, openPocket } = this.props
    const { dropDownActive } = this.state

    const dropDownProps = {
      openPocket: openPocket,
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
      setInputFocusState: this.setInputFocusState
    }

    const currentTags = {
      suggested: this.props.suggested,
      used: this.props.used,
      marked: this.props.marked
    }

    return (
      <Doorhanger
        tab_id={1}
        isSaveActive={this.isSaveActive}
        currentTab={{ status, type, dropDownActive }}
        setDropDownStatus={this.setDropDownStatus}
        currentTags={currentTags}
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
  const { suggested, used, marked } = state.tags
  return { status, type, item_id, suggested, used, marked }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SafariApp)
