import styles from './item.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import * as Icon from '../../../../components/icons'
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
            <li
                style={this.props.motionStyle}
                className={recommendationItemClass}>
                {item.has_image && (
                    <div className={styles.image} style={this.imageStyle} />
                )}

                <div className={styles.title}>
                    <a
                        className={styles.link}
                        href={item.url}
                        rel="noopener noreferrer"
                        target="_blank">
                        {item.title}
                    </a>
                </div>

                <div className={styles.source}>{domainForUrl(item.url)}</div>

                <div className={styles.actions}>
                    <button
                        className={saveButtonClass}
                        onClick={() =>
                            this.props.saveRecommendation({
                                hash: this.props.hash,
                                id: item.id,
                                title: item.title,
                                url: item.url
                            })
                        }>
                        {Icon.Save()} {this.saveCopy}
                    </button>
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
