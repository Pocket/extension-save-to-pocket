import React, { Component } from 'react'
import styled from 'react-emotion'

const SaveWrapper = styled('div')`
  transform: translateY(${props => (props.animateIn ? 0 : '-150%')});
  opacity: ${props => (props.animateIn ? 1 : 0)};
  transition: transform 550ms cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 450ms cubic-bezier(0.165, 0.84, 0.44, 1);
`

export class SaveAnimation extends Component {
  state = { animate: false }

  componentDidMount() {
    this.setState({ animate: true })
  }

  get shouldShow() {
    return this.props.status !== 'idle' && this.state.animate
  }

  render() {
    return (
      <SaveWrapper animateIn={this.shouldShow}>
        {this.props.children}
      </SaveWrapper>
    )
  }
}
