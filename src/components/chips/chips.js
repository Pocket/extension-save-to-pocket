import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'

const chipList = css`
  display: inline;
  list-style-type: none;
  margin: 0;
  padding: 0;
`
const chipItem = css`
  background-color: var(--color-calloutBackgroundPrimary);
  border: 1px solid var(--color-calloutBackgroundPrimary);
  border-radius: 50px;
  color: var(--color-chipsText);
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
    color: var(--color-chipsText);
    margin-left: 10px;
  }

  &.active, &:hover {
    border: 1px solid var(--color-chipsActive);
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
          className={cx(chipItem, active && 'active')}
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
