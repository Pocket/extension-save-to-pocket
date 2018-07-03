import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tagging } from 'Modules/Tagging/tagging'
import { taggingActions } from './tagging.state'

export class TaggingContainer extends Component {
  addTag = tag => {
    if (this.props.tags.includes(tag)) return
    this.props.addTag({ tag, tabId: this.props.activeTabId })
  }

  removeTag = tag => {
    if (!this.props.tags.includes(tag)) return
    this.props.removeTag({ tag, tabId: this.props.activeTabId })
  }

  setTags = tags => {
    this.props.setTags({ tags, tabId: this.props.activeTabId })
  }

  render() {
    const { tags, suggestions } = this.props
    return (
      <Tagging
        addTag={this.addTag}
        removeTag={this.removeTag}
        setTags={this.setTags}
        tags={tags}
        suggestions={suggestions}
        typeahead={[]}
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
  return {
    activeTabId: state.tab,
    tags: activeSave.tags || [],
    suggestions: activeSave.suggestions || []
  }
}

export const Tags = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaggingContainer)
