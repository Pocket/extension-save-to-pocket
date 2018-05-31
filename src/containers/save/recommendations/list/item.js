import styles from './item.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Icon } from 'Elements/Icons/icon'
import { domainForUrl } from '../../../../common/utilities'
import { localize } from '../../../../common/_locales/locales'

const cx = classNames.bind(styles)
const copy = {
  idle: localize('actions', 'save'),
  saving: localize('recommendations', 'saving'),
  saved: localize('recommendations', 'saved')
}
export default class RecommendationItem extends Component {
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

  onClick = () => {
    const item = this.props.item

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

    let itemContainerClass = cx({
      itemContainer: true,
      isSpoc: item.isSpoc
    })

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
        <div className={itemContainerClass}>
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

          <div className={styles.source}>{domainForUrl(item.display_url)}</div>

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
              <Icon name="save" /> {this.saveCopy}
            </button>
          </div>
        </div>
      </li>
    )
  }
}

RecommendationItem.propTypes = {
  item: PropTypes.object,
  motionStyle: PropTypes.object,
  saveRec: PropTypes.func
}
