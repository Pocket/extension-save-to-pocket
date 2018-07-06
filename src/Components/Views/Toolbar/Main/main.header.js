import React, { Component } from 'react'
import styled from 'react-emotion'
import { localize } from 'Common/_locales/locales'
import { Icon } from 'Elements/Icons/icon'
import { Overflow } from '../Overflow/overflow'
import { Colors } from 'Elements/Colors/colors'

const StatusText = styled('span')`
  display: flex;
  align-items: center;
`

const StatusIcon = styled('span')`
  color: ${Colors.hotCoral};
`

const HeaderWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  padding: 0;
  position: relative;
`

export class ToolbarHeader extends Component {
  get statusText() {
    const { status, saveType } = this.props
    if (status === 'saved') return localize('status', `${saveType}_${status}`)
    return localize('status', status)
  }

  render() {
    const { archiveItem, removeItem } = this.props
    return (
      <HeaderWrapper>
        <StatusText>
          <StatusIcon>
            <Icon name="pocketmark" margin="0 5px 0 0" />
          </StatusIcon>
          {this.statusText}
        </StatusText>
        <Overflow archiveItem={archiveItem} removeItem={removeItem} />
      </HeaderWrapper>
    )
  }
}

ToolbarHeader.defaultProps = {
  saveType: 'page',
  status: 'saving'
}
