import React, { Component } from 'react'
import styled from 'react-emotion'
import TagChips from './tag.chips'
import TagInput from './tag.input'
import TagError from './tag.error'
import TagSuggestions from './tag.suggestions'
import TypeAhead from '../TypeAhead/typeAhead'
import { Shades } from 'Elements/Colors/colors'

const TagBox = styled('div')`
  font-size: 13px;
  border-radius: 4px;
  display: block;
  border: 1px solid ${Shades.overcast};
  padding: 0.8em 0.8em 0.4em;
  min-height: 2em;
  position: relative;
  margin-top: 10px;
`

export class Tagging extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      hasError: false,
      tags: props.tags,
      activeTags: [],
      inputReady: false
    }
    this.inputProps = {
      highlightedIndex: () => console.log('highlightedIndex'),
      closePanel: () => console.log('closePanel'),
      onBlur: () => console.log('onBlur')
    }
  }

  componentDidMount() {
    this.setState({ inputReady: true })
  }

  setInputRef = input => (this.inputReference = input)
  setBlur = () => this.inputReference.blur()
  setFocus = () => this.inputReference.focus()

  onFocus = () => {}

  setValue = value => {
    this.setState({ value })
  }

  setError = () => {
    this.setState({ hasError: true })
  }
  clearError = () => {
    this.setState({ hasError: false })
  }

  // Tag Handling
  handleChipClick = tag => {
    const tagActive = this.state.activeTags.includes(tag)
    tagActive ? this.makeTagInactive(tag) : this.makeTagActive(tag)
  }

  handleChipRemove = tag => {
    console.log(tag)
    this.props.removeTag(tag)
  }

  addTag = tag => {
    this.setState({ value: '' })
    this.props.addTag(tag)
  }

  handleRemoveAction = () => {
    if (this.state.activeTags.length) return this.removeActiveTags()
    this.makeTagActive(this.props.tags.slice(-1)[0])
  }

  removeActiveTags = () => {
    const { activeTags } = this.state
    const { tags, setTags } = this.props
    setTags(tags.filter(tag => !activeTags.includes(tag)))
    this.setState({ activeTags: [] })
  }

  makeTagActive = tag => {
    this.setState({ activeTags: [...this.state.activeTags, tag] })
  }

  makeTagInactive = tag => {
    this.setState({
      activeTags: this.state.activeTags.filter(activeTag => activeTag !== tag)
    })
  }

  deactivateTags = () => {
    this.setState({ activeTags: [] })
  }

  render() {
    return (
      <React.Fragment>
        <TagBox onClick={this.setFocus}>
          {this.props.tags && (
            <TagChips
              activeTags={this.state.activeTags}
              tags={this.props.tags}
              handleChipClick={this.handleChipClick}
              handleChipRemove={this.handleChipRemove}
            />
          )}
          <TagInput
            // Set Reference
            inputRef={this.setInputRef}
            // Value Handling
            value={this.state.value}
            setValue={this.setValue}
            characterLimit={25}
            // Error Handling
            clearError={this.clearError}
            setError={this.setError}
            hasError={this.state.hasError}
            // Tags Active
            hasActiveTags={this.state.activeTags.length}
            deactivateTags={this.deactivateTags}
            handleRemoveAction={this.handleRemoveAction}
            // Passed Props
            addTag={this.addTag}
            onFocus={this.onFocus}
            {...this.inputProps}
          />
          <TypeAhead
            inputReady={this.state.inputReady}
            reFocus={this.setFocus}
            setValue={this.setValue}
            inputValue={this.state.value}
            textInput={this.inputReference}
            items={this.props.typeahead || []}
          />
          {this.state.hasError && <TagError characterLimit={25} />}
        </TagBox>

        <TagSuggestions
          suggestions={this.props.suggestions}
          tags={this.props.tags}
          addTag={this.addTag}
        />
      </React.Fragment>
    )
  }
}
