import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Icon from 'components/icons'
import { localize } from 'common/_locales/locales'
import SpocHeader from './spoc.header'
import {
  ItemWrapper,
  SpocContainer,
  SaveButton,
  ItemImage,
  ItemLink,
  ItemTitle,
  ItemActions,
  ItemSource
} from './item'

const copy = {
  idle: localize('actions', 'save'),
  saving: localize('recommendations', 'saving'),
  saved: localize('recommendations', 'saved')
}
export default class RecommendationSpoc extends Component {
  get imageStyle() {
    return {
      backgroundImage: 'url("' + this.props.item.image + '")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }

  get saveCopy() {
    return copy[this.props.item.status]
  }

  get spocContext() {
    const item = this.props.item
    return {
      cxt_impression_id: item.impression_id,
      cxt_view: 'extension_ad',
      cxt_feed_item: item.feed_item_id,
      cxt_index: item.sort_id,
      cxt_post_id: item.post_id
    }
  }

  onClick = () => {
    const item = this.props.item

    this.props.spocClick({ context: this.spocContext })

    this.props.openRecommendation({
      tabId: this.props.tabId,
      item_id: item.id.toString(),
      title: item.title,
      url: item.url,
      position: this.props.position,
      source_id: item.source_id
    })
  }

  render() {
    let item = this.props.item

    return (
      <ItemWrapper style={this.props.motionStyle}>
        <SpocHeader
          tabId={this.props.tabId}
          itemId={item.id.toString()}
          sponsorurl={item.url}
          sponsor={item.sponsor}
          avatar={item.avatar}
          spocContext={this.spocContext}
          spocImpression={this.props.spocImpression}
          spocView={this.props.spocView}
          spocClick={this.props.spocClick}
          spocRemove={this.props.spocRemove}
        />

        <SpocContainer>
          {item.has_image && <ItemImage style={this.imageStyle} />}

          <ItemTitle>
            <ItemLink
              onClick={this.onClick}
              href={item.url}
              rel="noopener noreferrer"
              target="_blank">
              {item.title}
            </ItemLink>
          </ItemTitle>

          <ItemSource>{item.display_url}</ItemSource>

          <ItemActions>
            <SaveButton
              onClick={() => {
                return this.props.saveRecommendation({
                  tabId: this.props.tabId,
                  item_id: item.id.toString(),
                  title: item.title,
                  url: item.url,
                  position: this.props.position,
                  source_id: item.source_id
                })
              }}>
              {Icon.Save()} {this.saveCopy}
            </SaveButton>
          </ItemActions>
        </SpocContainer>
      </ItemWrapper>
    )
  }
}

RecommendationSpoc.propTypes = {
  item: PropTypes.object,
  motionStyle: PropTypes.object,
  saveRec: PropTypes.func
}
