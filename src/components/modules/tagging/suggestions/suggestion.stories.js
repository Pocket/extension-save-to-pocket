import React from 'react'
import { CHEMICAL_ELEMENTS } from 'common/_mocks/tags'
import samplesize from 'lodash.samplesize'

import { storiesOf } from '@storybook/react'
import Suggestions from './suggestions'
storiesOf('Modules | Tagging', module).add('suggestions', () => {
  const tags = samplesize(CHEMICAL_ELEMENTS, 5)
  const used = tags.slice(2)
  return <Suggestions suggestions={tags} tags={{ used }} addTag={() => {}} />
})
