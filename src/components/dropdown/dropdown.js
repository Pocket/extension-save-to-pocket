import React from 'react'
import DropdownItem from './dropdownItem'
import * as Icon from '../icons'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { COLORS } from 'elements/colors/colors'
const { $snow, $overcast, $white, $darksmoke } = COLORS

const DropdownWrapper = styled.div`
  float: right;
  padding: 3px 0;
  text-align: right;

  ul {
    background: ${$white};
    border: 1px solid ${$snow};
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    list-style-type: none;
    margin: 0;
    opacity: ${props => (props.active ? '1' : '0')};
    padding: 9px 0 7px;
    position: absolute;
    right: 5px;
    top: 22px;
    transform: ${props =>
      props.active ? 'translateX(0)' : 'translateX(200%)'};
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: 10;

    &::after {
      clear: both;
      content: ' ';
      display: block;
    }
  }

  button {
    all: unset;
    color: ${$overcast};
    cursor: pointer;

    &:hover {
      color: ${$darksmoke};
    }
    padding: 0 0 0 5px;
  }
`
Dropdown.propTypes = {
  active: PropTypes.bool,
  tabId: PropTypes.string,
  list: PropTypes.array,
  setStatus: PropTypes.func
}
export default function Dropdown({ active, tabId, list, setStatus }) {
  let hoverTimer
  const onHover = () => {
    clearTimeout(hoverTimer)
    if (active) return

    setStatus(tabId, true)
  }

  const offHover = () => {
    hoverTimer = setTimeout(() => {
      setStatus(tabId, false)
    }, 250)
  }
  return (
    <DropdownWrapper active={active}>
      <button onMouseOver={onHover} onMouseOut={offHover}>
        {Icon.Overflow()}
      </button>
      {active && (
        <ul onMouseOver={onHover} onMouseOut={offHover}>
          {list.map((entryObject, index) => (
            <DropdownItem key={index} entryObject={entryObject} />
          ))}
        </ul>
      )}
    </DropdownWrapper>
  )
}
