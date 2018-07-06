import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tagging } from 'Modules/Tagging/tagging'
import { taggingActions } from './tagging.state'
import { getSetting } from 'Common/interface'

export class TaggingContainer extends Component {
  addTag = tag => {
    if (this.props.tags.includes(tag)) return
    const { activeTabId, item_id } = this.props
    this.props.addTag({ tag, tabId: activeTabId, item_id })
  }

  removeTag = tag => {
    if (!this.props.tags.includes(tag)) return
    const { activeTabId, item_id } = this.props
    this.props.removeTag({ tag, tabId: activeTabId, item_id })
  }

  setTags = tags => {
    const { activeTabId, item_id } = this.props
    this.props.setTags({ tags, tabId: activeTabId, item_id })
  }

  render() {
    const { tags, suggestions, storedTags } = this.props
    return (
      <Tagging
        addTag={this.addTag}
        removeTag={this.removeTag}
        setTags={this.setTags}
        tags={tags}
        suggestions={suggestions}
        typeahead={storedTags}
      />
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(taggingActions, dispatch)
}

function mapStateToProps(state) {
  const activeSave = state.tags[state.tab] || {}
  const { item_id } = state.saves[state.tab]
  const storedTags = JSON.parse(getSetting('tags_stored'))

  return {
    activeTabId: state.tab,
    item_id,
    tags: activeSave.tags || [],
    suggestions: activeSave.suggestions || [],
    storedTags
  }
}

export const Tags = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaggingContainer)
