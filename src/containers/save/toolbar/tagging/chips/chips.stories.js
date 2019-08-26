import React from 'react'

import { storiesOf } from '@storybook/react'
import Chips from './chips'
storiesOf('Tagging | Chips', module).add('with marked', () => (
  <Chips
    tags={['tag1', 'tag2', 'tag3']}
    marked={['tag2']}
    toggleActive={() => {}}
  />
))
storiesOf('Tagging | Chips', module).add('without marked', () => (
  <Chips
    tags={['tag1', 'tag2', 'tag3']}
    marked={[]}
    toggleActive={() => {}}
  />
))
