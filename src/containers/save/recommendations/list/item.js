import styles from './item.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import * as Icon from '../../../../components/icons'
import { domainForUrl } from '../../../../common/utilities'
import { localize } from '../../../../common/_locales/locales'
import SpocHeader from './item.spoc.header'

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
            <li
                style={this.props.motionStyle}
                className={recommendationItemClass}>
                <div className={itemContainerClass}>

                    {item.isSpoc && (
                        <SpocHeader
                            sponsorurl={item.sponsorurl}
                            sponsor={item.sponsor}
                            avatar={item.avatar}
                            domain={item.domain}
                            impression_id={item.impression_id}
                        />
                    )}

                    {item.has_image && (
                        <div className={styles.image} style={this.imageStyle} />
                    )}

                    <div className={styles.title}>
                        <a
                            onClick={() => {
                                return this.props.openRecommendation({
                                    tabId: this.props.tabId,
                                    item_id: item.id.toString(),
                                    title: item.title,
                                    url: item.url,
                                    position: this.props.position,
                                    source_id: item.source_id
                                })
                            }}
                            className={styles.link}
                            href={item.url}
                            rel="noopener noreferrer"
                            target="_blank">
                            {item.title}
                        </a>
                    </div>

                    <div className={styles.source}>
                        {domainForUrl(item.url)}
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={saveButtonClass}
                            onClick={() => {
                                console.log(item)
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

RecommendationItem.propTypes = {
    item: PropTypes.object,
    motionStyle: PropTypes.object,
    saveRec: PropTypes.func
}
