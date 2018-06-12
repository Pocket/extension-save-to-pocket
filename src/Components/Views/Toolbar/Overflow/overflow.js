import React, { Component } from 'react'
import styled from 'react-emotion'

import { Shades, Colors } from 'Elements/Colors/colors'
import { Icon } from 'Elements/Icons/icon'
import { buttonReset } from 'Elements/Buttons/button'

import { OverflowMenu } from './overflow.menu'
import { Popover, Trigger, Content } from 'Modules/Popover/popover'

const OverflowTrigger = styled('button')`
  ${buttonReset};
  color: ${Shades.overcast};
  &:hover {
    color: ${Colors.teal};
  }
`

export class Overflow extends Component {
  state = { active: false }

  render() {
    return (
      <React.Fragment>
        <Popover>
          <Trigger>
            <OverflowTrigger>
              <Icon name="overflow" />
            </OverflowTrigger>
          </Trigger>

          <Content>
            <OverflowMenu active={this.state.active} />
          </Content>
        </Popover>
      </React.Fragment>
    )
  }
}
