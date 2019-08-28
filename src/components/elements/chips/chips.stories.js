import React from 'react'

import { storiesOf } from '@storybook/react'
import Chips from './chips'
storiesOf('Elements | Chips', module)
  .add('default', () => (
    <Chips
      tags={['tag1', 'tag2', 'tag3']}
      marked={[]}
      toggleActive={() => {}}
    />
  ))
  .add('marked', () => (
    <Chips
      tags={['tag1', 'tag2', 'tag3']}
      marked={['tag2']}
      toggleActive={() => {}}
    />
  ))
