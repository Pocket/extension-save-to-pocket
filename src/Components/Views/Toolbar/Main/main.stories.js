import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToolbarMain } from './main'
import { ToolbarError } from './main.error'
import { ToolbarHeader } from './main.header'

storiesOf('Views|Toolbar/Main', module)
  .add('Header', () => <ToolbarHeader />)
  .add('Error', () => <ToolbarError />)
storiesOf('Views|Toolbar/Main', module)
  .add('Panel - Link Saved', () => (
    <ToolbarMain type={'link'} status={'saved'} />
  ))
  .add('Panel - Page Saved', () => (
    <ToolbarMain type={'page'} status={'saved'} />
  ))
  .add('Panel - Link Saving', () => (
    <ToolbarMain type={'link'} status={'saving'} />
  ))
  .add('Panel - Page Saving', () => (
    <ToolbarMain type={'page'} status={'saving'} />
  ))
  .add('Panel - Link Archiving', () => (
    <ToolbarMain type={'link'} status={'archiving'} />
  ))
  .add('Panel - Page Archiving', () => (
    <ToolbarMain type={'page'} status={'archiving'} />
  ))
  .add('Panel - Link Archived', () => (
    <ToolbarMain type={'link'} status={'archived'} />
  ))
  .add('Panel - Page Archived', () => (
    <ToolbarMain type={'page'} status={'archived'} />
  ))
  .add('Panel - Link Removing', () => (
    <ToolbarMain type={'link'} status={'removing'} />
  ))
  .add('Panel - Page Removing', () => (
    <ToolbarMain type={'page'} status={'removing'} />
  ))
  .add('Panel - Link Removed', () => (
    <ToolbarMain type={'link'} status={'removed'} />
  ))
  .add('Panel - Page Removed', () => (
    <ToolbarMain type={'page'} status={'removed'} />
  ))
  .add('Panel - Error', () => <ToolbarMain type={'page'} status={'error'} />)
