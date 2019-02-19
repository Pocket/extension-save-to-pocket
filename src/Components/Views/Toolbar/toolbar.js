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
  padding: 10px;
  position: relative;
  text-align: left;
  z-index: 100;
`

/* Renderers
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export class ToolbarMain extends Component {
  render() {
    const { status, saveType, archiveItem, removeItem } = this.props
    return (
      <ToolbarWrapper>
        <ToolbarHeader
          status={status}
          saveType={saveType}
          archiveItem={archiveItem}
          removeItem={removeItem}
        />
        {status === 'error' ? <ToolbarError /> : this.props.children}
      </ToolbarWrapper>
    )
  }
}
