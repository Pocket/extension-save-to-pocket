import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { matchSorter } from 'match-sorter'
import { Chips } from 'elements/chips/chips'
import Downshift from 'downshift'
import { Suggestions } from './suggestions/suggestions'
import { Taginput } from './taginput/taginput'
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

export const Tagging = ({
  tags,
  setInputFocusState,
  tabId,
  addTag,
  activateTag,
  deactivateTag,
  deactivateTags,
  removeTags,
  removeTag,
  storedTags,
  inputFocused,
  closePanel
}) => {
  const hasTags = () => {
    return tags && tags.used && tags.used.length
  }

  const [placeholder, setPlaceholder] = useState(!hasTags())
  const [inputvalue, setInputValue] = useState('')
  const inputRef = useRef(null)

  /* Input Management
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const setFocus = () => {
    setInputFocusState(true)
    setPlaceholder(false)
  }
  const setBlur = () => {
    const status = inputvalue.length || hasTags()
    setInputFocusState(false)
    setPlaceholder(!status)
  }

  /* Tag Management
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const addTagAction = (value) => {
    if (value === '') return
    if (tags.used.indexOf(value) >= 0) return
    addTag({ value, tabId })
    setPlaceholder(false)
    setInputValue('')
    inputRef.current.focus()
  }

  /* Active/Inactive Tagging
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const makeTagActive = (tag) => {
    return activateTag({ tag, tabId })
  }

  const makeTagInactive = (tag) => {
    return deactivateTag({ tag, tabId })
  }

  const makeTagsInactive = (blur) => {
    if (!tags.marked.length) return blur ? inputRef.current.blur() : null
    deactivateTags({ tabId })
  }

  const handleRemoveAction = () => {
    if (inputvalue.length || !hasTags()) return
    if (!tags.marked.length) return makeTagActive()
    removeTags({ tabId })
  }

  const removeTagAction = (tag) => {
    removeTag({ tag, tabId })
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
    const value = inputvalue
    const usedTags = hasTags() ? tags.used : []
    const tagsArray = storedTags || []
    const filteredStoredTags = tagsArray.filter(
      item => usedTags.indexOf(item) < 0
    )
    return value ? matchSorter(filteredStoredTags, value) : []
  }

  /* Render Component
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
  return (
    <TaggingWrapper>
      <Downshift onSelect={onSelect}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex
        }) => (
          <div>
            <TaggingWell onMouseUp={onMouseUp}>
              {placeholder && !hasTags() && (
                <TaggingPlaceholder>
                  {localize('tagging', 'add_tags')}
                </TaggingPlaceholder>
              )}

              {!!hasTags() && (
                <Chips
                  tags={tags.used}
                  marked={tags.marked}
                  toggleActive={toggleActive}
                  removeTag={removeTagAction}
                />
              )}

              <Taginput
                highlightedIndex={highlightedIndex}
                getInputProps={getInputProps}
                hasTags={!!hasTags()}
                inputRef={inputRef}
                value={inputvalue}
                focused={inputFocused}
                setValue={setInputValue}
                setFocus={setFocus}
                setBlur={setBlur}
                closePanel={closePanel}
                addTag={addTagAction}
                handleRemoveAction={handleRemoveAction}
                makeTagsInactive={makeTagsInactive}
                storedTags={storedTagsList()}
              />
            </TaggingWell>

            {!isOpen || !storedTagsList().length ? null : (
              <TaggingTypeaheadWrapper>
                <TaggingTypeaheadList>
                  {storedTagsList().map((item, index) => {
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
      </Downshift>

      {tags && tags.suggested && (
        <Suggestions
          tags={tags}
          suggestions={tags.suggested}
          addTag={addTagAction}
        />
      )}
    </TaggingWrapper>
  )
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
