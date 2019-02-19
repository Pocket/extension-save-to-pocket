import React, { Component } from 'react'
import styled from 'react-emotion'
import { Shades } from 'Elements/Colors/colors'

/* Styles
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const SuggestionList = styled('div')`
  padding: 10px 0 0;
  margin-bottom: -6px;
`

const SuggestionWrapper = styled('div')`
  background-color: ${Shades.lightsmoke};
  border: 1px solid ${Shades.silver};
  cursor: pointer;
  display: inline-block;
  border-radius: 4px;
  text-transform: lowercase;
  user-select: none;
  font-size: 0.8em;
  padding: 0.2em 0.6em;
  margin-bottom: 0.5em;
  margin-right: 0.5em;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: white;
    background-color: ${Shades.overcast};
    border-color: ${Shades.overcast};
  }
`

/* Renderers
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export default class TagSuggestions extends Component {
  prevent = event => {
    event.preventDefault()
  }

  get usedTags() {
    return this.props.tags || []
  }

  get suggestedTags() {
    return this.props.suggestions
      .filter(item => !this.usedTags.includes(item))
      .map((suggestion, index) => {
        return (
          <SuggestionWrapper
            key={index}
            onMouseDown={event => this.prevent(event)}
            onClick={() => this.props.addTag(suggestion)}>
            {suggestion}
          </SuggestionWrapper>
        )
      })
  }

  render() {
    return this.suggestedTags.length ? (
      <SuggestionList>{this.suggestedTags}</SuggestionList>
    ) : null
  }
}
