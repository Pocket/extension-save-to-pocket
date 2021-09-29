import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'

const chipList = css`
  display: inline;
  list-style-type: none;
  margin: 0;
  padding: 0;

  &:last-child {
    min-height: 21px;
  }
`
const chipItem = css`
  border: 1px solid #E8F7F6;
  border-radius: 50px;
  color: #004D48;
  cursor: pointer;
  display: inline-flex;
  align-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 2px;
  margin-right: 3px;
  margin-top: 2px;
  text-transform: lowercase;
  background-color: #E8F7F6;
  padding: 8px;

  &:first-of-type {
    margin-left: 20px;
  }

  span {
    display: inline-block;
    font-size: 18px;
    font-weight: 100;
    line-height: 16px;
    padding-left: 4px;
    vertical-align: middle;
    &:hover {
      color: #ef4056;
    }
  }

  &:hover {
    border-color: #999;
  }
`

const chipItemActive = css`
  background-color: #ddd;
  padding: 2px 5px 2px 6px;
`

export const Chips = ({ removeTag, tags, marked, toggleActive }) => {
  const listItems = () => {
    return tags.map((chip, index) => {
      const active = marked.includes(chip)
      const handleToggle = (e) => toggleActive(chip, active)
      const handleRemove = (e) => {
        e.stopPropagation()
        removeTag(chip)
      }

      return (
        <li
          className={cx(chipItem, marked ? chipItemActive : null)}
          active={active}
          key={index}
          onMouseDown={event => event.preventDefault()}
          onClick={handleToggle}>
          {chip}
          {active ? (
            <span onClick={handleRemove}>&times;</span>
          ) : null}
        </li>
      )
    })
  }

  return (
    <ul className={chipList}>{listItems()}</ul>
  )
}

Chips.propTypes = {
  tags: PropTypes.array,
  marked: PropTypes.array,
  toggleActive: PropTypes.func,
  removeTag: PropTypes.func
}
