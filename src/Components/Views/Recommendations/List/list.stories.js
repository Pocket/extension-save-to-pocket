import React from 'react'
import { storiesOf } from '@storybook/react'
import recommendationData from 'Common/_mocks/recResponse.json'
import { RecommendationList } from './list'

const recFeed = recommendationData.feed

storiesOf('Views|Recommendations/List', module).add('Stacked', () => (
  <RecommendationList items={recFeed} />
))
