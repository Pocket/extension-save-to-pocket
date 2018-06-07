import React, { Component } from 'react'
import styled from 'react-emotion'
import { localize } from 'Common/_locales/locales'
import { Icon } from 'Elements/Icons/icon'
import { Overflow } from '../Overflow/overflow'
import { Colors } from 'Elements/Colors/colors'

const StatusText = styled('span')`
  display: block;
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
    const { status, type } = this.props
    if (status === 'saved') return localize('status', `${type}_${status}`)
    return localize('status', status)
  }

  render() {
    return (
      <HeaderWrapper>
        <StatusText>
          <StatusIcon>
            <Icon name="logopocket" />
          </StatusIcon>{' '}
          {this.statusText}
        </StatusText>
        <Overflow />
      </HeaderWrapper>
    )
  }
}

ToolbarHeader.defaultProps = {
  type: 'page',
  status: 'saved'
}
