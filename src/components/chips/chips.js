import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'
import { COLORS } from 'elements/colors/colors'
const { $powder, $gray, $pitch, $hotCoral, $smoke, $overcast } = COLORS

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
  border: 1px solid ${$gray};
  border-radius: 3px;
  color: ${$pitch};
  cursor: pointer;
  display: inline-flex;
  align-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  margin-bottom: 2px;
  margin-right: 3px;
  margin-top: 2px;
  text-transform: lowercase;
  background-color: ${$powder};
  padding: '2px 12px';

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
      color: ${$hotCoral};
    }
  }

  &:hover {
    border-color: ${$overcast};
  }
`

const chipItemActive = css`
  background-color: ${$smoke};
  padding: '2px 5px 2px 6px';
`

export const Chips = ({ removeTag, tags, marked, toggleActive }) => {
  const removeTagAction = (tag) => {
    removeTag(tag)
  }

  const listItems = () => {
    return tags.map((chip, index) => {
      const active = marked.includes(chip)

      return (
        <li
          className={cx(chipItem, marked ? chipItemActive : null)}
          active={active}
          key={index}
          onMouseDown={event => event.preventDefault()}
          onClick={() => toggleActive(chip, active)}>
          {chip}
          {active ? (
            <span onClick={() => removeTagAction(chip)}>&times;</span>
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
