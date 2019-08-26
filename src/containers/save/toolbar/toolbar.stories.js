import React from 'react'

import { storiesOf } from '@storybook/react'
import Toolbar from './toolbar.main'
storiesOf('Toolbar | Toolbar', module).add('show toolbar', () => (
  <Toolbar
  />
))
storiesOf('Toolbar | Toolbar', module).add('with error', () => (
  <Toolbar
    currentTab={{ status: 'error'}}
  />
))
storiesOf('Toolbar | Toolbar', module).add('saving', () => (
  <Toolbar
    currentTab={{ status: 'saving'}}
  />
))
storiesOf('Toolbar | Toolbar', module).add('saved', () => (
  <Toolbar
    currentTab={{ status: 'saved'}}
  />
))
