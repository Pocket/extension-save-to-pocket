import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { matchSorter } from 'match-sorter'
import { css, cx } from 'linaria'
import Downshift from 'downshift'
import { Suggestions } from './suggestions/suggestions'
import { TagInput } from './taginput/taginput'
import { localize } from 'common/_locales/locales'
import { Chips } from 'components/chips/chips'

const taggingWrapper = css`
  padding: 10px 0 0;
  position: relative;
`
const taggingPlaceholder = css`
  color: var(--color-grey45);
  position: absolute;
  left: 10px;
  top: 14px;
`
const taggingWell = css`
  background-color: var(--color-canvas);
  border: 1px solid var(--color-grey85);
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 16px;
  margin: 0;
  padding: 4px 5px;
  position: relative;
  text-align: left;

  .pocket-theme-dark & {
    border-color: var(--color-grey55);
  }
`

const taggingTypeaheadWrapper = css`
  position: relative;
  z-index: 1;
`

const taggingTypeaheadList = css`
  background-color: var(--color-canvas);
  border: 1px solid var(--color-grey85);
  border-radius: 0 0 3px 3px;
  border-top: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
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

  .pocket-theme-dark & {
    border-color: var(--color-grey55);
    box-shadow: 0px 2px 4px rgba(255, 255, 255, 0.25);
  }
`

const taggingTypeaheadItem = css`
  background-color: var(--color-calloutBackgroundPrimary);
  border: 1px solid var(--color-calloutBackgroundPrimary);
  border-radius: 50px;
  color: var(--color-teal30);
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 4px;
  margin-right: 4px;
  padding: 8px;
  text-align: center;
  text-transform: lowercase;
  transform: translateZ(0.1);

  .active &, &:hover {
    border: 1px solid var(--color-grey10);
  }

  .pocket-theme-dark & {
    color: var(--color-white100);
  }
  .pocket-theme-dark .active &, &:hover {
    border-color: var(--color-white100);
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
    <div className={taggingWrapper}>
      <Downshift onSelect={onSelect}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex
        }) => (
          <div>
            <div className={taggingWell} onMouseUp={onMouseUp}>
              {placeholder && !hasTags && (
                <div className={taggingPlaceholder}>
                  {localize('tagging', 'add_tags')}
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
              <div className={taggingTypeaheadWrapper} onClick={onMouseUp}>
                <div className={taggingTypeaheadList}>
                  {storedTagsList().map((item, index) => (
                    <div
                      className={cx(highlightedIndex === index && 'active')}
                      key={`item-${index}`}
                      {...getItemProps({ item, index})}
                    >
                      <div className={taggingTypeaheadItem}>{item}</div>
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
