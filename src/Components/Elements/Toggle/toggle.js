import React, { Component } from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { Colors, Shades } from 'Elements/Colors/colors'

const ToggleWrapper = styled('button')`
  all: unset;
  background: ${props => (props.active ? Colors.teal : Shades.silver)};
  border: 1px solid ${Shades.overcast};
  border-radius: 2em;
  cursor: pointer;
  display: inline-block;
  height: 10px;
  margin-right: 5px;
  outline: 0;
  padding: 2px;
  transition: all 0.4s ease;
  width: 20px;

  &:after {
    background: ${Shades.white};
    border-radius: 50%;
    content: '';
    display: block;
    height: 100%;
    left: ${props => (props.active ? '50%' : 0)};
    position: relative;
    transition: all 0.2s ease;
    width: 50%;
  }
`

export default class Toggle extends Component {
  render() {
    const { active, action } = this.props
    return <ToggleWrapper active={active} onClick={action} />
  }
}

Toggle.propTypes = {
  active: PropTypes.bool,
  action: PropTypes.func
}
