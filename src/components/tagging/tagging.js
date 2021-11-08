import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { matchSorter } from 'match-sorter'
import { css, cx } from 'linaria'
import Downshift from 'downshift'
import { Suggestions } from './suggestions/suggestions'
import { TagInput } from './taginput/taginput'
import { Chips } from 'components/chips/chips'

const taggingWrapper = css`
  &.tagging-wrapper {
    padding: 10px 0 0;
    position: relative;
  }

  .tagging-placeholder {
    color: var(--color-grey45);
    position: absolute;
    left: 10px;
    top: 14px;
  }

  .tagging-well {
    background-color: var(--color-canvas);
    border: 1px solid var(--color-taggingBorder);
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: var(--fontSansSerif);
    line-height: 16px;
    margin: 0;
    padding: 4px 5px;
    position: relative;
    text-align: left;
  }

  .typeahead-wrapper {
    position: relative;
    z-index: 1;
  }

  .typeahead-list {
    background-color: var(--color-canvas);
    border: 1px solid var(--color-taggingBorder);
    border-radius: 0 0 4px 4px;
    border-top: none;
    box-shadow: 0px 2px 4px var(--color-taggingShadow);
    box-sizing: border-box;
    color: var(--color-textPrimary);
    display: block;
    left: 0;
    list-style-type: none;
    margin: 0;
    max-height: 8.8em;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 5px;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .typeahead-item {
    background-color: var(--color-calloutBackgroundPrimary);
    border: 1px solid var(--color-calloutBackgroundPrimary);
    border-radius: 50px;
    color: var(--color-chipsText);
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-family: var(--fontSansSerif);
    line-height: 16px;
    margin-bottom: 4px;
    margin-right: 4px;
    padding: 8px;
    text-align: center;
    text-transform: lowercase;
    transform: translateZ(0.1);

    &:hover {
      border: 1px solid var(--color-chipsActive);
    }
  }

  .tag-active .typeahead-item {
    border: 1px solid var(--color-chipsActive);
  }
`

export const Tagging = ({
  usedTags,
  markedTags,
  suggestedTags,
  storedTags,
  addTag,
  activateTag,
  deactivateTag,
  deactivateTags,
  removeTag,
  removeTags,
  closePanel,
  submitTaggingError
}) => {
  const hasTags = usedTags && usedTags.length

  const [placeholder, setPlaceholder] = useState(!hasTags)
  const [inputvalue, setInputValue] = useState('')
  const inputRef = useRef(null)

  /* Input Management
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const setFocus = () => {
    setPlaceholder(false)
  }
  const setBlur = () => {
    const status = inputvalue.length || hasTags
    setPlaceholder(!status)
  }

  /* Tag Management
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const addTagAction = (value) => {
    if (value === '') return
    if (usedTags.indexOf(value) >= 0) return
    addTag({ value })
    setPlaceholder(false)
    setInputValue('')
    inputRef.current.focus()
  }

  /* Active/Inactive Tagging
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const makeTagActive = (tag) => {
    return activateTag({ tag })
  }

  const makeTagInactive = (tag) => {
    return deactivateTag({ tag })
  }

  const makeTagsInactive = (blur) => {
    if (!markedTags.length) return blur ? inputRef.current.blur() : null
    deactivateTags()
  }

  const handleRemoveAction = () => {
    if (inputvalue.length || !hasTags) return
    if (!markedTags.length) return makeTagActive()
    removeTags()
  }

  const removeTagAction = (tag) => {
    removeTag({ tag })
  }

  const toggleActive = (tag, active) => {
    if (active) makeTagInactive(tag)
    else makeTagActive(tag)
    inputRef.current.focus()
  }

  const onMouseUp = e => {
    inputRef.current.focus()
    e.stopPropagation()
    e.preventDefault()
  }

  const onSelect = addTagAction

  const storedTagsList = () => {
    const filteredStoredTags = storedTags.filter(
      item => usedTags.indexOf(item) < 0
    )
    return inputvalue ? matchSorter(filteredStoredTags, inputvalue) : []
  }

  /* Render Component
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  return (
    <div className={cx('tagging-wrapper', taggingWrapper)}>
      <Downshift onSelect={onSelect}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex
        }) => (
          <div>
            <div className="tagging-well" onMouseUp={onMouseUp}>
              {placeholder && !hasTags && (
                <div className="tagging-placeholder">
                  {chrome.i18n.getMessage('tagging_add_tags')}
                </div>
              )}

              {!!hasTags ? (
                <Chips
                  tags={usedTags}
                  marked={markedTags}
                  toggleActive={toggleActive}
                  removeTag={removeTagAction}
                />
              ) : null }

              <TagInput
                highlightedIndex={highlightedIndex}
                typeaheadOpen={isOpen}
                getInputProps={getInputProps}
                inputRef={inputRef}
                value={inputvalue}
                setValue={setInputValue}
                setFocus={setFocus}
                setBlur={setBlur}
                closePanel={closePanel}
                addTag={addTagAction}
                handleRemoveAction={handleRemoveAction}
                makeTagsInactive={makeTagsInactive}
                storedTags={storedTagsList()}
                submitTaggingError={submitTaggingError}
              />
            </div>

            {!isOpen || !storedTagsList().length ? null : (
              <div className="typeahead-wrapper" onClick={onMouseUp}>
                <div className="typeahead-list">
                  {storedTagsList().map((item, index) => (
                    <div
                      className={cx(highlightedIndex === index && 'tag-active')}
                      key={`item-${index}`}
                      {...getItemProps({ item, index})}
                    >
                      <div className="typeahead-item">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Downshift>

      {suggestedTags ? (
        <Suggestions
          used={usedTags}
          suggestions={suggestedTags}
          addTag={addTagAction}
        />
      ) : null}
    </div>
  )
}

Tagging.propTypes = {
  usedTags: PropTypes.array,
  markedTags: PropTypes.array,
  suggestedTags: PropTypes.array,
  storedTags: PropTypes.array,
  activateTag: PropTypes.func,
  deactivateTag: PropTypes.func,
  deactivateTags: PropTypes.func,
  addTag: PropTypes.func,
  removeTag: PropTypes.func,
  removeTags: PropTypes.func,
  closePanel: PropTypes.func,
  submitTaggingError: PropTypes.func
}
