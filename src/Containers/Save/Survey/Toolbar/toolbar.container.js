import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToolbarMain } from 'Views/Toolbar/toolbar'
import { Tags } from 'Containers/Save/Toolbar/Tagging/tagging.container'
import { saveActions } from 'Containers/Save/save.state'

export class ToolbarContainer extends Component {
  archiveItem = () => {
    const { item_id, tabId } = this.props
    this.props.archiveItem({ item_id, tabId })
  }

  removeItem = () => {
    const { item_id, tabId } = this.props
    this.props.removeItem({ item_id, tabId })
  }

  get showTags() {
    const showTagsOn = ['saving', 'saved']
    return showTagsOn.includes(this.props.status)
  }

  render() {
    const { status, saveType } = this.props
    return (
      <ToolbarMain
        status={status}
        saveType={saveType}
        archiveItem={this.archiveItem}
        removeItem={this.removeItem}>
        {this.showTags ? <Tags /> : null}
      </ToolbarMain>
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  const { archiveItem, removeItem } = saveActions
  return bindActionCreators(
    {
      archiveItem,
      removeItem
    },
    dispatch
  )
}

function mapStateToProps(state) {
  const activeSave = state.saves[state.tab]
  return {
    tabId: state.tab,
    item_id: activeSave.item_id,
    status: activeSave.status,
    saveType: activeSave.saveType
  }
}

export const Toolbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarContainer)
