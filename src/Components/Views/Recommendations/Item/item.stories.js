import React from 'react'
import { storiesOf } from '@storybook/react'
import recommendationData from 'Common/_mocks/recResponse.json'
import { RecommendationItem } from './item'

const rec = recommendationData.feed[0]

storiesOf('Views|Recommendations/Item', module)
  .addDecorator(story => <div style={{ width: '320px' }}>{story()}</div>)
  .add('Standard', () => <RecommendationItem item={rec.item} />)
