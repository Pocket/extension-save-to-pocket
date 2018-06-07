import React from 'react'
import { storiesOf } from '@storybook/react'
import { SurveyPanel } from './survey'
import surveyData from 'Common/_mocks/surveyResponse'

storiesOf('Views|Survey/Panel', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Intent', () => <SurveyPanel {...surveyData} />)
