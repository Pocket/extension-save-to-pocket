import React from 'react'

import { storiesOf } from '@storybook/react'
import RecommendationList from './list'
import RecommendationItem from './item'
import SpocHeader from './spoc.header'
storiesOf('Views | Recommendations', module)
  .add('list item', () => (
    <RecommendationItem
      motionStyle={{}}
      key={0}
      item={{
        id: 1,
        image: '',
        has_image: false,
        source_id: 1,
        url: 'url',
        title: 'title',
        display_url: 'https://getpocket.com'
      }}
      position={1}
      openRecommendation={() => {}}
      saveRecommendation={() => {}}
      tabId={1}
    />
  ))
  .add('spoc', () => (
    <SpocHeader
      tabId={1}
      itemId={1}
      sponsorurl={'https://getpocket.com'}
      sponsor={'Sponsor'}
      avatar={''}
      spocContext={{}}
      spocImpression={() => {}}
      spocView={() => {}}
      spocClick={() => {}}
      spocRemove={() => {}}
    />
  ))
  .add('list', () => (
    <RecommendationList
      tabId={1}
      openRecommendation={() => {}}
      saveRecommendation={() => {}}
      spocImpression={() => {}}
      spocView={() => {}}
      spocClick={() => {}}
      spocRemove={() => {}}
      list={[
        {
          id: 1,
          image: '',
          has_image: false,
          source_id: 1,
          url: 'url',
          title: 'title',
          display_url: 'https://getpocket.com'
        },
        {
          id: 2,
          image: '',
          has_image: false,
          source_id: 2,
          url: 'url',
          title: 'title',
          display_url: 'https://getpocket.com'
        }
      ]}
    />
  ))
