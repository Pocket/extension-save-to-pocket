import React from 'react'

import { storiesOf } from '@storybook/react'
import Survey from './survey.main'
storiesOf('Survey | Main', module).add('show survey', () => (
  <Survey
    survey={{ show: true }}
    surveyRespond={() => {}}
    surveyCancel={() => {}}
  />
))
