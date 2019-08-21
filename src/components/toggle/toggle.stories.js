import React from 'react'

import { storiesOf } from '@storybook/react'
import Toggle from './toggle'
storiesOf('Toggle', module)
  .add('active', () => <Toggle active={true}>click me!</Toggle>)
  .add('inactive', () => <Toggle active={false}>click me!</Toggle>)
  .add('darkmode', () => <Toggle darkMode={true}>click me!</Toggle>)

