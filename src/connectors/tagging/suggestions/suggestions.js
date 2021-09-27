import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { COLORS } from 'elements/colors/colors'
const { $pitch, $snow, $silver, $tar, $darksmoke, $overcast, $white } = COLORS

const SuggestionsWrapper = styled.div`
  box-sizing: border-box;
  color: ${$pitch};
  display: block;
  font-size: 13px;
  line-height: 17px;
  text-align: left;
  width: 100%;
`
const SuggestionsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 10px 0 0;
  text-align: left;
`
const SuggestionItem = styled.li`
  background-color: ${$snow};
  border: 1px solid ${$silver};
  border-radius: 3px;
  color: ${$tar};
  cursor: pointer;
  display: inline-block;
  font-weight: 300;
  letter-spacing: 0.05em;
  line-height: 16px;
  margin-bottom: 4px;
  margin-right: 6px;
  min-width: 15%;
  padding: 2px 8px;
  text-align: center;
  text-transform: lowercase;
  transform: translateZ(0.1);

  &:hover {
    background-color: ${$darksmoke};
    border-color: ${$overcast};
    color: ${$white};
  }
`

export const Suggestions = ({ addTag, suggestions, tags }) => {
  const prevent = event => {
    event.preventDefault()
  }

  const listItems = () => {
    const tagFilter = tags.used || []
    return suggestions
      .filter(item => !tagFilter.includes(item))
      .map((suggestion, index) => (
        <SuggestionItem
          key={index}
          onMouseDown={prevent}
          onClick={() => addTag(suggestion)}>
          {suggestion}
        </SuggestionItem>
      ))
  }

  return (
    <SuggestionsWrapper>
      <SuggestionsList>{listItems()}</SuggestionsList>
    </SuggestionsWrapper>
  )
}

Suggestions.propTypes = {
  suggestions: PropTypes.array,
  addTag: PropTypes.func,
  tags: PropTypes.object
}
