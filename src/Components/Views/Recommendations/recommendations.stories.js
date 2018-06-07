import React from 'react'
import { storiesOf } from '@storybook/react'
import { RecommendationPanel } from './recommendations'
import recommendationData from 'Common/_mocks/recResponse.json'

const recFeed = recommendationData.feed

storiesOf('Views|Recommendations/Panel', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Loading', () => <RecommendationPanel loading={true} />)
  .add('Recs', () => <RecommendationPanel items={recFeed} loading={false} />)
  .add('Recs - Reason', () => (
    <RecommendationPanel items={recFeed} loading={false} reason={'Puppies'} />
  ))
  .add('No Recs', () => (
    <RecommendationPanel items={[]} loading={false} norecs={1} />
  ))
