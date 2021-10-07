import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AutosizeInput from 'react-input-autosize'
import { css, cx } from 'linaria'

const inputWrapper = css`
  max-width: 100%;
  display: inline-block;
  margin: 4px 0;

  input {
    all: unset;
    color: var(--color-textPrimary);
    display: inline-block;
    line-height: 16px;
    margin-bottom: 3px;
    margin-left: 0;
    margin-right: 3px;
    margin-top: 3px;
    min-width: 0.3em;
    padding: 2px 4px;
  }

  &.error input {
    color: var(--color-coral);
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

export const TagInput = ({
  setValue,
  handleRemoveAction,
  makeTagsInactive,
  addTag,
  value,
  highlightedIndex,
  closePanel,
  getInputProps,
  inputRef,
  setFocus,
  setBlur,
  submitTaggingError
}) => {
  const [errorState, setErrorState] = useState(false)

  const setError = () => {
    setErrorState(true)
    submitTaggingError(true)
  }

  const clearError = () => {
    setErrorState(false)
    submitTaggingError(false)
  }

  /* Input Events
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onKeyUp = (event) => {
    switch (event.keyCode) {
      case BACKSPACE:
      case DELETE:
        clearError()
        return handleRemoveAction()
      case ESCAPE:
        clearError()
        setValue('')
        return makeTagsInactive(true)
      default:
        makeTagsInactive()
    }
  }

  const onInput = (event) => {
    if (event.charCode === COMMA || event.keyCode === TAB) {
      event.preventDefault()
      addTag(value)
    }

    if (event.keyCode === ENTER) {
      if (highlightedIndex != null) return
      event.preventDefault()
      if (value) addTag(value)
      else closePanel()
    }

    if (
      value.length > 24 &&
      event.keyCode !== BACKSPACE &&
      event.keyCode !== DELETE &&
      event.keyCode !== LEFT &&
      event.keyCode !== UP &&
      event.keyCode !== RIGHT &&
      event.keyCode !== DOWN &&
      event.keyCode !== ENTER
    ) {
      setError()
      event.preventDefault()
      return
    }
  }

  return (
    <div className={cx(inputWrapper, errorState && 'error')}>
      <AutosizeInput
        {...getInputProps({
          ref: inputRef,
          value: value,
          onChange: onChange,
          onFocus: setFocus,
          onBlur: setBlur,
          onKeyUp: onKeyUp,
          onKeyDown: onInput,
          onKeyPress: onInput
        })}
      />
    </div>
  )
}

TagInput.propTypes = {
  getInputProps: PropTypes.func,
  setBlur: PropTypes.func,
  setFocus: PropTypes.func,
  addTag: PropTypes.func,
  handleRemoveAction: PropTypes.func,
  makeTagsInactive: PropTypes.func,
  setValue: PropTypes.func,
  value: PropTypes.string,
  hasTags: PropTypes.bool,
  submitTaggingError: PropTypes.func
}
