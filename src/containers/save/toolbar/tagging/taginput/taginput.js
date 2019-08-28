import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { localize } from 'common/_locales/locales'
import AutosizeInput from 'react-input-autosize'
import styled from '@emotion/styled'
import { COLORS } from 'common/styles/colors'
const { $pitch, $powder, $hotCoral } = COLORS

const TagError = styled.div`
  background-color: ${$powder};
  border: 1px solid ${$hotCoral};
  border-radius: 3px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  color: ${$hotCoral};
  left: 50%;
  padding: 6px 12px;
  position: absolute;
  top: 100%;
  transform: translate(-50%, -2px);
  width: 80%;
`

const InputWrapper = styled('div')`
  max-width: 100%;
  display: inline-block;
  input {
    all: unset;
    color: ${$pitch};
    display: inline-block;
    line-height: 16px;
    margin-bottom: 3px;
    margin-left: ${props => props.active ? '0' : '16px'};
    margin-right: 3px;
    margin-top: 3px;
    min-width: 0.3em;
    padding: 2px 4px;
  }
`

const BACKSPACE = 8
const COMMA = 44
const TAB = 9
const ENTER = 13
const DELETE = 46
const ESCAPE = 27
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40

export default class Taginput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }

  setError() {
    clearTimeout(this.errorTimer)
    this.setState({ error: true })

    this.errorTimer = setTimeout(() => {
      this.setState({ error: false })
    }, 3000)
  }

  clearError() {
    if (this.state.error) {
      clearTimeout(this.errorTimer)
      this.setState({ error: false })
    }
  }

  /* Input Events
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  onChange = event => {
    this.props.setValue(event.target.value)
  }

  onKeyUp = event => {
    switch (event.keyCode) {
      case BACKSPACE:
      case DELETE:
        this.clearError()
        return this.props.handleRemoveAction()
      case ESCAPE:
        this.clearError()
        this.props.setValue('')
        return this.props.makeTagsInactive(true)
      default:
        this.props.makeTagsInactive()
    }
  }

  onInput = event => {
    if (event.charCode === COMMA || event.keyCode === TAB) {
      event.preventDefault()
      this.props.addTag(this.props.value)
    }

    if (event.keyCode === ENTER) {
      if (this.props.highlightedIndex != null) return
      event.preventDefault()
      if (this.props.value) this.props.addTag(this.props.value)
      else this.props.closePanel(0)
    }

    if (
      this.props.value.length > 24 &&
      event.keyCode !== BACKSPACE &&
      event.keyCode !== DELETE &&
      event.keyCode !== LEFT &&
      event.keyCode !== UP &&
      event.keyCode !== RIGHT &&
      event.keyCode !== DOWN &&
      event.keyCode !== ENTER
    ) {
      this.setError()
      event.preventDefault()
      return
    }
  }

  render() {
    const hasError = this.props.error || this.state.error
    return (
      <InputWrapper active={this.props.hasTags}>
        <AutosizeInput
          {...this.props.getInputProps({
            ref: this.props.inputRef,
            value: this.props.value,
            onChange: this.onChange,
            onFocus: this.props.setFocus,
            onBlur: this.props.setBlur,
            onKeyUp: this.onKeyUp,
            onKeyDown: this.onInput,
            onKeyPress: this.onInput
          })}
        />
        {hasError && <TagError>{localize('tagging', 'invalid_tags')}</TagError>}
      </InputWrapper>
    )
  }
}

Taginput.propTypes = {
  getInputProps: PropTypes.func,
  setBlur: PropTypes.func,
  setFocus: PropTypes.func,
  addTag: PropTypes.func,
  handleRemoveAction: PropTypes.func,
  handleDirection: PropTypes.func,
  makeTagsInactive: PropTypes.func,
  setValue: PropTypes.func,
  inputRef: PropTypes.func,
  value: PropTypes.string,
  focused: PropTypes.bool,
  hasTags: PropTypes.bool
}
