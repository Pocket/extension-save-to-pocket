import React from 'react'
import styled from 'react-emotion'
import { RecommendationItem } from '../Item/item'

export const ListWrapper = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export class RecommendationList extends React.Component {
  render() {
    const { items } = this.props
    return items.length ? (
      <ListWrapper>
        {items.map(item => (
          <RecommendationItem key={item.feed_item_id} item={item} />
        ))}
      </ListWrapper>
    ) : null
  }
}
