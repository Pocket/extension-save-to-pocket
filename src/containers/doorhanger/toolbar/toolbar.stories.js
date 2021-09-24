import React from 'react'

import { storiesOf } from '@storybook/react'
import Toolbar from './toolbar.main'
storiesOf('Views | Toolbar', module)
  .add('error', () => <Toolbar currentTab={{ status: 'error' }} />)
  .add('saving', () => <Toolbar currentTab={{ status: 'saving' }} />)
  .add('saved: link', () => (
    <Toolbar currentTab={{ status: 'saved', type: 'link' }} />
  ))
  .add('saved: page', () => (
    <Toolbar currentTab={{ status: 'saved', type: 'page' }} />
  ))
