import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { localize } from 'common/_locales/locales'
import AutosizeInput from 'react-input-autosize'
import { css, cx } from 'linaria'

const TagError = css`
  background-color: #f9f9f9;
  border: 1px solid #ef4056;
  border-radius: 3px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  color: #ef4056;
  left: 50%;
  padding: 6px 12px;
  position: absolute;
  top: 100%;
  transform: translate(-50%, -2px);
  width: 80%;
`

const InputWrapper = css`
  max-width: 100%;
  display: inline-block;
  input {
    all: unset;
    color: #222;
    display: inline-block;
    line-height: 16px;
    margin-bottom: 3px;
    margin-left: 16px;
    margin-right: 3px;
    margin-top: 3px;
    min-width: 0.3em;
    padding: 2px 4px;
  }

  &.active input {
    margin-left: 0;
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
  typeaheadOpen,
  closePanel,
  error,
  getInputProps,
  hasTags,
  inputRef,
  setFocus,
  setBlur
}) => {
  const [errorState, setErrorState] = useState(false)
  let errorTimer

  const setError = () => {
    clearTimeout(errorTimer)
    setErrorState(true)

    errorTimer = setTimeout(() => {
      setErrorState(false)
    }, 3000)
  }

  const clearError = () => {
    if (error) {
      clearTimeout(errorTimer)
      setErrorState(false)
    }
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
    <div className={cx(InputWrapper, hasTags && 'active')}>
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
      {(error || errorState) ? (
        <div className={TagError}>{localize('tagging', 'invalid_tags')}</div>
      ) : null}
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
  // inputRef: PropTypes.func,
  value: PropTypes.string,
  hasTags: PropTypes.bool
}
