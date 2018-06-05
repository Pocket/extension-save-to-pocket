import React, { Component } from 'react'
import styled from 'react-emotion'
import { Shades } from 'Elements/Colors/colors'
import { PanelBase } from 'Elements/Foundations/foundation'

import Tagging from 'Modules/Tagging/tagging'
import { ToolbarError } from './main.error'
import { ToolbarHeader } from './main.header'

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
`

const validForTags = ['saving', 'saved']

function Tags({ status }) {
  return validForTags.includes(status) ? <Tagging /> : null
}

export class ToolbarMain extends Component {
  remove = () => this.props.remove()
  archive = () => this.props.archive()

  render() {
    const { status, type } = this.props
    return (
      <ToolbarWrapper>
        <ToolbarHeader status={status} type={type} />
        {status === 'error' ? <ToolbarError /> : <Tags status={status} />}
      </ToolbarWrapper>
    )
  }
}
