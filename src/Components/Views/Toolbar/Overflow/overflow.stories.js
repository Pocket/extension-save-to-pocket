import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'react-emotion'
import { OverflowItem } from './overflowItem'
import { OverflowMenu } from './overflow.menu'
import { Overflow } from './overflow'
import { PanelBase } from 'Elements/Foundations/foundation'

const OverFlowContainer = styled('div')`
  ${PanelBase};
  position: relative;
  text-align: right;
  padding: 0 10px;
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
  .add('Menu', () => <OverflowMenu active={true} />)
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
