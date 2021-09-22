import React from 'react'
import { CHEMICAL_ELEMENTS } from 'common/_mocks/tags'
import samplesize from 'lodash.samplesize'
import { storiesOf } from '@storybook/react'
import { Tagging } from './tagging'

/* Tagging Story
------------------------------------------------------- */
storiesOf('Modules | Tagging', module).add('all', () => (
  <div style={{ width: '300px' }}>
    <Tagging
      tags={{
        marked: samplesize(CHEMICAL_ELEMENTS, 2),
        used: samplesize(CHEMICAL_ELEMENTS, 3),
        suggested: samplesize(CHEMICAL_ELEMENTS, 5)
      }}
      activateTag={() => {}}
      deactivateTags={() => {}}
      addTag={() => {}}
      removeTags={() => {}}
    />
  </div>
))
