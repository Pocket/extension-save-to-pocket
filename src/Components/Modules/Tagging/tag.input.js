import React, { Component } from 'react'
import AutosizeInput from 'react-input-autosize'
import { KEYS } from 'Common/constants'
import styled, { css } from 'react-emotion'
import { Shades } from 'Elements/Colors/colors'

const InputWrapper = styled('div')`
  display: inline-block;
  margin-bottom: 0.7em;
  input {
    color: ${Shades.pitch};
  }
`
const InputStyle = css`
  all: unset;
  display: inline-block;
  min-width: 0.3em;
  line-height: 16px;
  padding: 2px 0;
`

export default class TagInput extends Component {
  // Input Events
  onFocus = event => {
    this.props.onFocus(event)
  }

  onBlur = event => {
    this.props.onBlur(event)
  }

  onChange = event => {
    this.props.setValue(event.target.value)
  }

  onKeyUp = event => {
    switch (event.keyCode) {
      // Handle intent to remove
      case KEYS.BACKSPACE:
      case KEYS.DELETE: {
        this.clearError()
        if (!this.props.value.length) this.props.handleRemoveAction()
        return
      }

      // Handle intent to exit
      case KEYS.ESCAPE: {
        this.clearError()
        this.props.setValue('')
        if (this.props.hasActiveTags) this.props.deactivateTags()
        return
      }

      // How neccesary is this on every keyup
      default:
        if (this.props.hasActiveTags) this.props.deactivateTags()
    }
  }

  onInput = event => {
    // Add Tag on comma or tab
    if (event.charCode === KEYS.COMMA || event.keyCode === KEYS.TAB) {
      event.preventDefault()
      this.props.addTag(`${this.props.value}`)
      return
    }

    // Close on double enter
    if (event.keyCode === KEYS.ENTER) {
      event.preventDefault()
      if (this.props.value) this.props.addTag(`${this.props.value}`)
      return
    }

    // Set error on tag length limit
    if (
      this.props.value.length > this.props.characterLimit &&
      event.keyCode !== KEYS.BACKSPACE &&
      event.keyCode !== KEYS.DELETE &&
      event.keyCode !== KEYS.LEFT &&
      event.keyCode !== KEYS.UP &&
      event.keyCode !== KEYS.RIGHT &&
      event.keyCode !== KEYS.DOWN &&
      event.keyCode !== KEYS.ENTER
    ) {
      this.setError()
      event.preventDefault()
      return
    }
  }

  setError = () => {
    if (!this.props.hasError) this.props.setError()
  }

  clearError = () => {
    if (this.props.hasError) this.props.clearError()
  }

  render() {
    return (
      <InputWrapper>
        <AutosizeInput
          autoFocus={true}
          inputRef={this.props.inputRef}
          inputClassName={InputStyle}
          value={this.props.value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onInput}
          onKeyPress={this.onInput}
        />
      </InputWrapper>
    )
  }
}
