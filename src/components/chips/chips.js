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
  background-color: #E8F7F6;
  border: 1px solid #E8F7F6;
  border-radius: 50px;
  color: #004D48;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  line-height: 16px;
  margin-right: 9px;
  padding: 8px;
  text-align: center;
  text-transform: lowercase;
  transform: translateZ(0.1);

  span {
    color: #1A1A1A;
    margin-left: 10px;
  }

  &.active {
    border: 1px solid #000;
  }
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
          className={cx(chipItem, active === true ?? 'active')}
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
