import React from 'react'
import { storiesOf } from '@storybook/react'
import { Popover, Trigger, Content } from './popover'
import styled from 'react-emotion'

const TriggerElement = styled('div')`
  color: #222;
  cursor: pointer;
  &:hover {
    color: pink;
  }
`

storiesOf('Modules|Popover', module)
  .add('On Hover', () => (
    <Popover>
      <Trigger>
        <TriggerElement>Trigger</TriggerElement>
      </Trigger>

      <Content>That was lovely</Content>
    </Popover>
  ))
  .add('On Click', () => (
    <Popover activateOnClick persist>
      <Trigger>
        <TriggerElement>Trigger</TriggerElement>
      </Trigger>

      <Content>That was lovely</Content>
    </Popover>
  ))
