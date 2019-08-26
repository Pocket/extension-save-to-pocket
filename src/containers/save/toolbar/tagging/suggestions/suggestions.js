import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { COLORS } from '../../../../../common/styles/colors'
const {
  $pitch,
  $snow,
  $silver,
  $tar,
  $darksmoke,
  $overcast,
  $white
} = COLORS

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
export default class Suggestions extends Component {
  prevent = event => {
    event.preventDefault()
  }

  get usedTags() {
    return this.props.tags.used || []
  }
  get listItems() {
    return this.props.suggestions
      .filter(item => !this.usedTags.includes(item))
      .map((suggestion, index) => {
        return (
          <SuggestionItem
            key={index}
            onMouseDown={event => this.prevent(event)}
            onClick={() => this.props.addTag(suggestion)}>
            {suggestion}
          </SuggestionItem>
        )
      })
  }

  render() {
    return (
      <SuggestionsWrapper>
        <div>
          <SuggestionsList>{this.listItems}</SuggestionsList>
        </div>
      </SuggestionsWrapper>
    )
  }
}

Suggestions.propTypes = {
  suggestions: PropTypes.array,
  addTag: PropTypes.func,
  tags: PropTypes.object
}
