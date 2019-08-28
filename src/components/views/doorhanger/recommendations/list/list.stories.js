import React from 'react'
import { storiesOf } from '@storybook/react'
import RecommendationList from './list'
import RecommendationItem from './item'
import SpocHeader from './spoc.header'
import recommendations from 'common/_mocks/recResponse.json'
import { getBestImage } from 'common/helpers'

const recs = recommendations.feed

function buildItem(rec) {
  return {
    id: parseInt(rec.item.item_id, 10),
    sort_id: rec.sort_id,
    source_id: rec.item.item_id,
    date: Date.now(),
    has_image: rec.item.has_image,
    title: rec.item.title,
    resolved_url: rec.item.resolved_url,
    display_url: rec.item.resolved_url,
    url: rec.item.given_url || rec.item.resolved_url,
    excerpt: rec.item.excerpt,
    image: getBestImage(rec.item),
    status: 'idle'
  }
}

storiesOf('Views | Recommendations / List', module)
  .add('item', () => (
    <RecommendationItem
      motionStyle={{}}
      key={0}
      item={buildItem(recs[0])}
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
      list={[buildItem(recs[0]), buildItem(recs[1]), buildItem(recs[2])]}
    />
  ))
