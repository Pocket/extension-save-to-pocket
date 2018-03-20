import styleClass from './item.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring, presets } from 'react-motion'
import RecommendationItem from './item'

export default class RecommendationList extends Component {
    // actual animation-related logic
    getDefaultStyles = () => {
        return this.props.list.map(rec => {
            return {
                ...rec,
                data: rec,
                key: 'id' + rec.id,
                style: { height: 0, opacity: 0 }
            }
        })
    }

    getStyles = () => {
        return this.props.list.map(rec => {
            const recHeight = rec.isSpoc ? 131 : 110
            return {
                ...rec,
                data: rec,
                key: 'id' + rec.id,
                style: {
                    height: spring(recHeight, { stiffness: 150, damping: 14 }),
                    opacity: spring(1, presets.stiff)
                }
            }
        })
    }

    willEnter() {
        return { height: 0, opacity: 0 }
    }
    willLeave() {
        return { height: spring(0), opacity: spring(0) }
    }

    render() {
        return (
            <TransitionMotion
                defaultStyles={this.getDefaultStyles()}
                styles={this.getStyles()}
                willLeave={this.willLeave}
                willEnter={this.willEnter}>
                {interpolatedStyles => (
                    <ul className={styleClass.list}>
                        {interpolatedStyles.map((config, index) => (
                            <RecommendationItem
                                motionStyle={config.style}
                                key={config.key}
                                item={config.data}
                                position={index}
                                openRecommendation={
                                    this.props.openRecommendation
                                }
                                saveRecommendation={
                                    this.props.saveRecommendation
                                }
                                tabId={this.props.tabId}
                            />
                        ))}
                    </ul>
                )}
            </TransitionMotion>
        )
    }
}

RecommendationList.propTypes = {
    list: PropTypes.array,
    recs: PropTypes.object,
    saveRec: PropTypes.func
}
