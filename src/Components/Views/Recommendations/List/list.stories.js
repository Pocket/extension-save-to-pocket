import React from 'react'
import { storiesOf } from '@storybook/react'
import recommendationData from 'Common/_mocks/recResponse.json'
import { RecommendationList } from './list'

const recFeed = recommendationData.feed

storiesOf('Views|Recommendations/List', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Stacked', () => <RecommendationList items={recFeed} />)
