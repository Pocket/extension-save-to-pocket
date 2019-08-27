import React from 'react'

import { storiesOf } from '@storybook/react'
import Tagging from './tagging'
storiesOf('Tagging | Tagging', module).add(
  'with marked, used and suggested tags',
  () => (
    <div style={{ width: '300px' }}>
      <Tagging
        tags={{
          marked: ['used1', 'used2'],
          used: ['used1', 'used2', 'suggest1', 'suggest1998'],
          suggested: ['suggest1', 'suggest2', 'used2']
        }}
        activateTag={() => {}}
        deactivateTags={() => {}}
        addTag={() => {}}
        removeTags={() => {}}
      />
    </div>
  )
)
