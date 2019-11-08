import React, { Component } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import RecommendationItem from './item'
import RecommendationSpoc from './spoc'
import styled from '@emotion/styled'
import { TYPOGRAPHY } from 'common/styles/variables'
import { COLORS } from 'elements/colors/colors'
const { $powder, $smoke, $white } = COLORS

const { $fontstackDefault } = TYPOGRAPHY

const ListAnimator = posed.ul({
  open: {
    delayChildren: 200,
    staggerChildren: 150
  },
  closed: {
    delay: 300
  }
})

const ItemAnimator = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 40, opacity: 0 }
})

const ListWrapper = styled(ListAnimator)`
  all: unset;
  display: block;
  font-family: ${$fontstackDefault};
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: left;

  li {
    list-style-type: none;
    background-color: ${$powder};
    border-top: 1px solid ${$smoke};
    &:hover {
      background-color: ${$white};
    }
  }
`
export default class RecommendationList extends Component {
  render() {
    return (
      <ListWrapper
        withParent={false}
        pose={this.props.list.length ? 'open' : 'closed'}>
        {this.props.list.map((rec, index) => {
          const Rec = rec.isSpoc ? RecommendationSpoc : RecommendationItem
          return (
            <ItemAnimator key={rec.id}>
              <Rec
                item={rec}
                position={index}
                openRecommendation={this.props.openRecommendation}
                saveRecommendation={this.props.saveRecommendation}
                spocImpression={this.props.spocImpression}
                spocView={this.props.spocView}
                spocClick={this.props.spocClick}
                spocRemove={this.props.spocRemove}
                tabId={this.props.tabId}
              />
            </ItemAnimator>
          )
        })}
      </ListWrapper>
    )
  }
}

RecommendationList.propTypes = {
  list: PropTypes.array,
  recs: PropTypes.object,
  saveRec: PropTypes.func
}
