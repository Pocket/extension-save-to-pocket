import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'react-emotion'
import { OverflowItem } from './overflowItem'
import { OverflowMenu } from './overflow.menu'
import { Overflow } from './overflow'

const OverFlowContainer = styled('div')`
  position: relative;
  width: 320px;
  height: 100px;
`

storiesOf('Views|Toolbar/Overflow/', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Dropdown', () => (
    <OverFlowContainer>
      <Overflow />
    </OverFlowContainer>
  ))

storiesOf('Views|Toolbar/Overflow/Menu', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Menu', () => (
    <OverFlowContainer>
      <OverflowMenu active={true} />
    </OverFlowContainer>
  ))
  .add('Item: Archive', () => (
    <OverflowItem name="archive_page" method={() => {}} />
  ))
  .add('Item: Remove', () => (
    <OverflowItem name="remove_page" copy={'remove_page'} method={() => {}} />
  ))
  .add('Item: Open Pocket', () => (
    <OverflowItem name="open_pocket" method={() => {}} divider />
  ))
  .add('Item: Settings', () => (
    <OverflowItem name="settings" copy={'settings'} method={() => {}} />
  ))
