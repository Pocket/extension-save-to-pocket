import React, { Component } from 'react'
import styled from 'react-emotion'
import { PopoverBase } from 'Elements/Foundations/foundation'

const PopoverContent = styled('div')`
  ${PopoverBase};
  width: auto;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 7px 0;
`

const PopoverContext = React.createContext()

export class Trigger extends Component {
  render() {
    return (
      <PopoverContext.Consumer>
        {({ toggle, activateOnClick, onHover, offHover }) =>
          activateOnClick ? (
            <span onClick={toggle}>{this.props.children}</span>
          ) : (
            <span onMouseOver={onHover} onMouseOut={offHover}>
              {this.props.children}
            </span>
          )
        }
      </PopoverContext.Consumer>
    )
  }
}

export class Content extends Component {
  render() {
    return (
      <PopoverContext.Consumer>
        {({ on, onHover, offHover }) =>
          on ? (
            <PopoverContent onMouseOver={onHover} onMouseOut={offHover}>
              {this.props.children}
            </PopoverContent>
          ) : null
        }
      </PopoverContext.Consumer>
    )
  }
}

export class Popover extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    this.state = { on: false }
  }

  toggle = () => this.setState(({ on }) => ({ on: !on }))

  activate = () => this.setState({ on: true })

  deActivate = () => this.setState({ on: false })

  onHover = () => {
    clearTimeout(this.hoverTimer)
    this.activate()
  }

  offHover = () => {
    this.hoverTimer = setTimeout(() => {
      this.deActivate()
    }, 250)
  }

  render() {
    return (
      <PopoverContext.Provider
        value={{
          on: this.state.on,
          toggle: this.toggle,
          onHover: this.onHover,
          offHover: this.offHover,
          activateOnClick: this.props.activateOnClick
        }}>
        <span ref={this.containerRef}>{this.props.children}</span>
      </PopoverContext.Provider>
    )
  }
}

Popover.defaultProps = {
  activateOnClick: false,
  persist: false
}
