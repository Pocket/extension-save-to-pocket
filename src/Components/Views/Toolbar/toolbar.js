import React, { Component } from 'react'
import styled from 'react-emotion'
import { Shades } from 'Elements/Colors/colors'
import { PanelBase } from 'Elements/Foundations/foundation'

import Tagging from 'Modules/Tagging/tagging'
import { ToolbarError } from './Main/main.error'
import { ToolbarHeader } from './Main/main.header'

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

const ToolbarBody = styled('div')`
  padding-top: 6px;
`

const validForTags = ['saving', 'saved']

function Tags({ status }) {
  return validForTags.includes(status) ? (
    <ToolbarBody>
      <Tagging />
    </ToolbarBody>
  ) : null
}

export class ToolbarMain extends Component {
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
