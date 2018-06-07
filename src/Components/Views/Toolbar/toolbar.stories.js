import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToolbarMain } from './toolbar'

storiesOf('Views|Toolbar/Panel/Link', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Saved', () => <ToolbarMain type={'link'} status={'saved'} />)
  .add('Saving', () => <ToolbarMain type={'link'} status={'saving'} />)
  .add('Archiving', () => <ToolbarMain type={'link'} status={'archiving'} />)
  .add('Archived', () => <ToolbarMain type={'link'} status={'archived'} />)
  .add('Removing', () => <ToolbarMain type={'link'} status={'removing'} />)
  .add('Removed', () => <ToolbarMain type={'link'} status={'removed'} />)

storiesOf('Views|Toolbar/Panel/Page', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Saved', () => <ToolbarMain type={'page'} status={'saved'} />)
  .add('Saving', () => <ToolbarMain type={'page'} status={'saving'} />)
  .add('Archiving', () => <ToolbarMain type={'page'} status={'archiving'} />)
  .add('Archived', () => <ToolbarMain type={'page'} status={'archived'} />)
  .add('Removing', () => <ToolbarMain type={'page'} status={'removing'} />)
  .add('Removed', () => <ToolbarMain type={'page'} status={'removed'} />)

storiesOf('Views|Toolbar/Panel', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Error', () => <ToolbarMain type={'page'} status={'error'} />)
