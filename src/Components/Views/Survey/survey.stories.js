import React from 'react'
import { storiesOf } from '@storybook/react'
import { SurveyPanel } from './survey'
import surveyData from 'Common/_mocks/surveyResponse'

storiesOf('Views|Survey/Panel', module).add('Intent', () => (
  <SurveyPanel {...surveyData} />
))
