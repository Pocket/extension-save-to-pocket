import React from 'react'
import survey from 'common/_mocks/surveyResponse.json'
import { storiesOf } from '@storybook/react'
import Survey from './survey.main'
storiesOf('Views | Survey', module).add('main', () => (
  <Survey survey={survey} surveyRespond={() => {}} surveyCancel={() => {}} />
))
