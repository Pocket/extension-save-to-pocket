import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToolbarError } from './main.error'
import { ToolbarHeader } from './main.header'

storiesOf('Views|Toolbar/Main', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Header', () => <ToolbarHeader />)
  .add('Error', () => <ToolbarError />)
