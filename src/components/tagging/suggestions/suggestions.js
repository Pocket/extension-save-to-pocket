import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'

const suggestionsWrapper = css`
  &.suggestions {
    box-sizing: border-box;
    display: block;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    width: 100%;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    margin: 0;
    padding: 10px 0 0;
    text-align: left;
  }

  li {
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
`

const SuggestionItem = ({ suggestion, addTag, used }) => {
  const prevent = (e) => e.preventDefault()

  const handleClick = (e) => {
    e.stopPropagation()
    addTag(suggestion)
  }

  return !used.includes(suggestion) ? (
    <li
      onMouseDown={prevent}
      onClick={handleClick}
    >
      {suggestion}
    </li>
  ) : null
}

export const Suggestions = ({ addTag, suggestions, used }) => {
  return (
    <div className={cx('suggestions', suggestionsWrapper)}>
      <ul>
        {suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={index}
            suggestion={suggestion}
            addTag={addTag}
            used={used}
          />
        ))}
      </ul>
    </div>
  )
}

Suggestions.propTypes = {
  suggestions: PropTypes.array,
  addTag: PropTypes.func,
  used: PropTypes.array
}
