import React from 'react'
import { storiesOf } from '@storybook/react'
import { Survey } from './survey'

storiesOf('Views|Survey/Panel', module).add('Intent', () => (
  <Survey
    fields={[
      {
        name: 'q_99',
        label: 'Question #1',
        type: 'radio',
        required: true,
        options: [
          {
            value: '0:10001',
            text: 'Option 1'
          },
          {
            value: '1:10003',
            text: 'Option 3'
          },
          {
            value: '2:10002',
            text: 'Option 2'
          }
        ]
      }
    ]}
  />
))
