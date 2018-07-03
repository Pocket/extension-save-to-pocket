import React, { Component } from 'react'
import styled from 'react-emotion'
import { Shades } from 'Elements/Colors/colors'
import { PanelBase } from 'Elements/Foundations/foundation'
import { ToolbarHeader } from './Main/main.header'
import { ToolbarError } from './Main/main.error'

/* Styles
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const ToolbarWrapper = styled('div')`
  ${PanelBase};
  color: ${Shades.pitch};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 10px;
  position: relative;
  text-align: left;
  z-index: 100;
  transform: translateY(${props => (props.animateIn ? 0 : '-150%')});
  opacity: ${props => (props.animateIn ? 1 : 0)};
  transition: transform 350ms cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 200ms cubic-bezier(0.165, 0.84, 0.44, 1);
`

/* Renderers
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export class ToolbarMain extends Component {
  state = { animate: false }

  componentDidMount() {
    this.setState({ animate: true })
  }

  get shouldShow() {
    return this.props.status !== 'idle' && this.state.animate
  }

  render() {
    const { status, saveType } = this.props
    return (
      <ToolbarWrapper animateIn={this.shouldShow}>
        <ToolbarHeader status={status} saveType={saveType} />
        {status === 'error' ? <ToolbarError /> : this.props.children}
      </ToolbarWrapper>
    )
  }
}
