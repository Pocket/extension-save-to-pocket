import styles from './item.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import * as Icon from '../../../../components/icons'
import { localize } from '../../../../common/_locales/locales'
import SpocHeader from './spoc.header'

const cx = classNames.bind(styles)
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

    let recommendationItemClass = cx({
      item: true,
      hasImage: item.has_image
    })

    let saveButtonClass = cx({
      save: true,
      saved: item.status === 'saved',
      saving: item.status === 'saving'
    })

    return (
      <li style={this.props.motionStyle} className={recommendationItemClass}>
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

        <div className={styles.spocContainer}>
          {item.has_image && (
            <div className={styles.image} style={this.imageStyle} />
          )}

          <div className={styles.title}>
            <a
              onClick={this.onClick}
              className={styles.link}
              href={item.url}
              rel="noopener noreferrer"
              target="_blank">
              {item.title}
            </a>
          </div>

          <div className={styles.source}>{item.display_url}</div>

          <div className={styles.actions}>
            <button
              className={saveButtonClass}
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
            </button>
          </div>
        </div>
      </li>
    )
  }
}

RecommendationSpoc.propTypes = {
  item: PropTypes.object,
  motionStyle: PropTypes.object,
  saveRec: PropTypes.func
}
