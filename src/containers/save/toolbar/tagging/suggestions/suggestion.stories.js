import React from 'react'

import { storiesOf } from '@storybook/react'
import Suggestions from './suggestions'
storiesOf('Tagging | Suggestions', module).add('with used tag', () => (
  <Suggestions
    suggestions={['tag1', 'tag2', 'tag3']}
    tags={{ used: ['tag2'] }}
    addTag={() => {}}
  />
))