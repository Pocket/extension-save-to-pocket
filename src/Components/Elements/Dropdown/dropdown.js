import React, { Component } from 'react'
import styled from 'react-emotion'
import dropdownItem from './dropdownItem'
import { Icon } from '../Icons/icon'
import { Shades } from 'Elements/Colors/colors'

const DropdownWrapper = styled('div')`
  float: right;
  padding: 3px 0;
  text-align: right;
`

const Trigger = styled('button')`
  all: unset;
  color: ${Shades.overcast};
  cursor: pointer;
  padding: 0 0 0 5px;

  &:hover {
    color: ${Shades.darksmoke};
  }
`

const OverflowList = styled('ul')`
  background: ${Shades.white};
  border: 1px solid ${Shades.snow};
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  margin: 0;
  opacity: ${props => (props.active ? 1 : 0)};
  padding: 9px 0 7px;
  position: absolute;
  right: 5px;
  top: 22px;
  transform: ${props => (props.active ? 'translateX(0)' : 'translateX(200%)')};
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 10;

  &::after {
    clear: both;
    content: ' ';
    display: block;
  }
`

export default class Dropdown extends Component {
  onHover = () => {
    clearTimeout(this.hoverTimer)
    if (this.props.active) return
    this.props.setStatus(this.props.tabId, true)
  }

  offHover = () => {
    this.hoverTimer = setTimeout(() => {
      this.props.setStatus(this.props.tabId, false)
    }, 250)
  }

  render() {
    const { active, list } = this.props
    return (
      <DropdownWrapper>
        <Trigger onMouseOver={this.onHover} onMouseOut={this.offHover}>
          <Icon name="overflow" />
        </Trigger>

        {this.props.active && (
          <OverflowList
            active={active}
            onMouseOver={this.onHover}
            onMouseOut={this.offHover}>
            {list.map(dropdownItem)}
          </OverflowList>
        )}
      </DropdownWrapper>
    )
  }
}
