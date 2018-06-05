import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { Colors, Shades } from 'Elements/Colors/colors'

const itemActive = css`
  color: ${Shades.white};
  background: ${Colors.teal};
`
const TypeAheadItemStyle = styled('div')`
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  border-top: none;
  line-height: 1em;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1rem;
  text-transform: none;
  font-weight: 400;
  box-shadow: none;
  box-sizing: border-box;
  padding: 0.3rem 1.1rem;
  white-space: normal;
  word-wrap: normal;
  ${props => (props.isActive ? itemActive : '')};
`

export class TypeAheadItem extends Component {
  constructor(props) {
    super(props)
    this.element = React.createRef()
  }

  clickAction = () => {
    this.props.action(this.props.index)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isActive) return
    if (this.props.isActive)
      this.element.current.scrollIntoView({ block: 'center' })
  }

  render() {
    const { isActive, item } = this.props
    return (
      <TypeAheadItemStyle isActive={isActive} onClick={this.clickAction}>
        <span ref={this.element}>{item}</span>
      </TypeAheadItemStyle>
    )
  }
}
