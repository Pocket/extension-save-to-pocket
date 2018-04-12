import styles from './tagging.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import matchSorter from 'match-sorter'
import Chips from './chips/chips'
import Downshift from 'downshift'
import Suggestions from './suggestions/suggestions'
import Taginput from './taginput/taginput'
import { localize } from '../../../../common/_locales/locales'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class Tagging extends Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholder: !this.hasTags(),
      inputvalue: '',
      activeSuggestion: -1
    }
  }

  /* Utilities
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  hasTags = () =>
    this.props.tags && this.props.tags.used && this.props.tags.used.length

  /* Input Management
    –––––––––––––––––––––––––––––––––––––––––––––––––– */

  setInputValue = inputvalue => this.setState({ inputvalue })
  setFocus = () => {
    this.props.setInputFocusState(true)
    this.setState({ placeholder: false })
  }
  setBlur = () => {
    const status = this.state.inputvalue.length || this.hasTags()
    this.props.setInputFocusState(false)
    this.setState({ placeholder: !status })
  }

  /* Tag Management
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  addTag = value => {
    if (value === '') return
    if (this.props.tags.used.indexOf(value) >= 0) return
    this.props.addTag({ value, tabId: this.props.tabId })
    this.setState({ placeholder: false, inputvalue: '' })
    this.input.focus()
  }

  /* Active/Inactive Tagging
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  makeTagActive = tag => {
    return this.props.activateTag({ tag, tabId: this.props.tabId })
  }

  makeTagInactive = tag => {
    return this.props.deactivateTag({ tag, tabId: this.props.tabId })
  }

  makeTagsInactive = blur => {
    if (!this.props.tags.marked.length) return blur ? this.input.blur() : null
    this.props.deactivateTags({ tabId: this.props.tabId })
  }

  handleRemoveAction = () => {
    if (this.state.inputvalue.length || !this.hasTags()) return
    if (!this.props.tags.marked.length) return this.makeTagActive()
    this.props.removeTags({ tabId: this.props.tabId })
  }

  removeTag = tag => {
    this.props.removeTag({ tag, tabId: this.props.tabId })
  }

  toggleActive = (tag, active) => {
    if (active) this.makeTagInactive(tag)
    else this.makeTagActive(tag)
    this.input.focus()
  }

  onMouseUp = e => {
    this.input.focus()
    e.stopPropagation()
    e.preventDefault()
  }

  onSelect = this.addTag

  get storedTags() {
    const value = this.state.inputvalue
    const usedTags = this.hasTags() ? this.props.tags.used : []
    const storedTags = this.props.storedTags || []
    const filteredStoredTags = storedTags.filter(
      item => usedTags.indexOf(item) < 0
    )
    return value ? matchSorter(filteredStoredTags, value) : []
  }

  /* Render Component
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  render() {
    let taggingClass = cx({
      well: true,
      active: this.props.inputFocused
    })

    return (
      <div className={styles.tagging}>
        <Downshift
          onSelect={this.onSelect}
          render={({
            getInputProps,
            getItemProps,
            isOpen,
            highlightedIndex
          }) => (
            <div>
              <div className={taggingClass} onMouseUp={this.onMouseUp}>
                {this.state.placeholder &&
                  !this.hasTags() && (
                    <div className={styles.placeholder}>
                      {localize('tagging', 'add_tags')}
                    </div>
                  )}

                {!!this.hasTags() && (
                  <Chips
                    tags={this.props.tags.used}
                    marked={this.props.tags.marked}
                    toggleActive={this.toggleActive}
                    removeTag={this.removeTag}
                  />
                )}

                <Taginput
                  highlightedIndex={highlightedIndex}
                  getInputProps={getInputProps}
                  hasTags={!!this.hasTags()}
                  inputRef={input => (this.input = input)}
                  value={this.state.inputvalue}
                  focused={this.props.inputFocused}
                  setValue={this.setInputValue}
                  setFocus={this.setFocus}
                  setBlur={this.setBlur}
                  closePanel={this.props.closePanel}
                  addTag={this.addTag}
                  handleRemoveAction={this.handleRemoveAction}
                  makeTagsInactive={this.makeTagsInactive}
                  storedTags={this.storedTags}
                />
              </div>

              {!isOpen || !this.storedTags.length ? null : (
                <div className={styles.typeaheadWrapper}>
                  <div className={styles.typeaheadList}>
                    {this.storedTags.map((item, index) => {
                      const itemStyle = cx({
                        typeahead: true,
                        active: highlightedIndex === index
                      })
                      return (
                        <div
                          className={itemStyle}
                          key={`item-${index}`}
                          {...getItemProps({
                            item,
                            index
                          })}>
                          {item}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        />

        {this.props.tags &&
          this.props.tags.suggested && (
            <Suggestions
              value={this.state.inputvalue}
              tags={this.props.tags}
              suggestions={this.props.tags.suggested}
              addTag={this.addTag}
              activate={this.activateTag}
              activateSuggestion={this.activateSuggestion}
            />
          )}
      </div>
    )
  }
}

Tagging.propTypes = {
  tags: PropTypes.object,
  activateTag: PropTypes.func,
  deactivateTags: PropTypes.func,
  addTag: PropTypes.func,
  removeTags: PropTypes.func
}
