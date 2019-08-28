import React from 'react'

import { storiesOf } from '@storybook/react'
import Survey from './survey.main'
storiesOf('Views | Survey', module).add('main', () => (
  <Survey
    survey={{ show: true }}
    surveyRespond={() => {}}
    surveyCancel={() => {}}
  />
))
