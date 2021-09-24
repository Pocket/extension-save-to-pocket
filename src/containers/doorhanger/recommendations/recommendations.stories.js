import React from 'react'
import { storiesOf } from '@storybook/react'
import Recommendations from './recommendations'
import recommendations from 'common/_mocks/recResponse.json'
import { getBestImage } from 'common/helpers'

const mockFunction = () => {}

function buildFeed(recs, source_id) {
  return recs.feed.map(rec => {
    const itemObject = {
      id: parseInt(rec.item.item_id, 10),
      sort_id: rec.sort_id,
      source_id: source_id,
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

    if (rec.impression_info) {
      itemObject.isSpoc = true
      itemObject.sponsor = rec.post.profile.name
      itemObject.avatar = rec.post.profile.avatar_url
      itemObject.has_image = true
      itemObject.image = rec.impression_info.display.image.src
      itemObject.impression_id = rec.impression_info.impression_id
      itemObject.feed_item_id = rec.feed_item_id
      itemObject.post_id = rec.post.post_id
      itemObject.display_url = rec.impression_info.display.domain
    }

    return itemObject
  })
}

const feed = buildFeed(recommendations)

recommendations.feed = feed

storiesOf('Views|Recommendations', module).add('recommendations', () => (
  <Recommendations
    recs={recommendations}
    saveRecommendation={mockFunction}
    removeRecommendation={mockFunction}
    spocClick={mockFunction}
    spocRemove={mockFunction}
  />
))
