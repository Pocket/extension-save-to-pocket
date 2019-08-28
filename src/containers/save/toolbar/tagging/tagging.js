import React, { Component } from 'react'
import PropTypes from 'prop-types'
import matchSorter from 'match-sorter'
import Chips from 'elements/chips/chips'
import Downshift from 'downshift'
import Suggestions from './suggestions/suggestions'
import Taginput from './taginput/taginput'
import { localize } from 'common/_locales/locales'
import styled from '@emotion/styled'
import { COLORS } from 'elements/colors/colors'
import { TYPOGRAPHY } from 'common/styles/variables'
const { $smoke, $overcast, $white, $teal } = COLORS
const { $fontstackDefault } = TYPOGRAPHY

const TaggingWrapper = styled.div`
  font-family: ${$fontstackDefault};
  padding: 5px 0 0;
  position: relative;
`
const TaggingPlaceholder = styled.div`
  color: ${$overcast};
  left: 29px;
  position: absolute;
  top: 10px;
`
const TaggingWell = styled.div`
  background: ${$white};
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23999999"><path d="M83.38 54.6L43.8 17.02H17.41V43.4l39.58 39.58L83.38 54.6zM30.95 36.81c-3.45 0-6.25-2.67-6.25-5.96s2.8-5.97 6.25-5.97 6.25 2.67 6.25 5.97c0 3.29-2.8 5.96-6.25 5.96z"/></svg>');
  background-position: 4px 7px;
  background-repeat: no-repeat;
  background-size: 22px;
  border: 1px solid ${$smoke};
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 16px;
  margin: 0;
  padding: 4px 10px;
  position: relative;
  text-align: left;
`

const TaggingTypeaheadWrapper = styled.div`
  position: relative;
`

const typeaheadActiveStyle = `
  background-color: ${$teal};
  color: ${$white};
`
const TaggingTypeaheadItem = styled.div`
  cursor: pointer;
  display: block;
  padding: 2px 8px;
  ${props => (props.active ? typeaheadActiveStyle : '')}
  &:hover {
    ${typeaheadActiveStyle}
  }
`
const TaggingTypeaheadList = styled.div`
  background: ${$white};
  border: 1px solid ${$smoke};
  border-radius: 0 0 3px 3px;
  border-top: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: block;
  left: 0;
  list-style-type: none;
  margin: 0;
  max-height: 8.8em;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 2px 0;
  position: absolute;
  top: 0;
  width: 100%;
`
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
    return (
      <TaggingWrapper>
        <Downshift
          onSelect={this.onSelect}
          render={({
            getInputProps,
            getItemProps,
            isOpen,
            highlightedIndex
          }) => (
            <div>
              <TaggingWell onMouseUp={this.onMouseUp}>
                {this.state.placeholder && !this.hasTags() && (
                  <TaggingPlaceholder>
                    {localize('tagging', 'add_tags')}
                  </TaggingPlaceholder>
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
              </TaggingWell>

              {!isOpen || !this.storedTags.length ? null : (
                <TaggingTypeaheadWrapper>
                  <TaggingTypeaheadList>
                    {this.storedTags.map((item, index) => {
                      return (
                        <TaggingTypeaheadItem
                          active={highlightedIndex === index}
                          key={`item-${index}`}
                          {...getItemProps({
                            item,
                            index
                          })}>
                          {item}
                        </TaggingTypeaheadItem>
                      )
                    })}
                  </TaggingTypeaheadList>
                </TaggingTypeaheadWrapper>
              )}
            </div>
          )}
        />

        {this.props.tags && this.props.tags.suggested && (
          <Suggestions
            value={this.state.inputvalue}
            tags={this.props.tags}
            suggestions={this.props.tags.suggested}
            addTag={this.addTag}
            activate={this.activateTag}
            activateSuggestion={this.activateSuggestion}
          />
        )}
      </TaggingWrapper>
    )
  }
}

Tagging.propTypes = {
  tags: PropTypes.shape({
    marked: PropTypes.array,
    used: PropTypes.array,
    suggested: PropTypes.array
  }),
  activateTag: PropTypes.func,
  deactivateTags: PropTypes.func,
  addTag: PropTypes.func,
  removeTags: PropTypes.func
}
