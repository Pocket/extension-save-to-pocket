import styles from './suggestions.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Suggestions extends Component {
    prevent = event => {
        event.preventDefault()
    }

    get usedTags() {
        return this.props.tags.used || []
    }
    get listItems() {
        return this.props.suggestions
            .filter(item => !this.usedTags.includes(item))
            .map((suggestion, index) => {
                return (
                    <li
                        key={index}
                        onMouseDown={event => this.prevent(event)}
                        onClick={() => this.props.addTag(suggestion)}
                        className={styles.suggestion}>
                        {suggestion}
                    </li>
                )
            })
    }

    render() {
        return (
            <div className={styles.suggestions}>
                <div>
                    {/*<div className={styles.header}>Suggested Tags</div>*/}
                    <ul className={styles.suggestionsList}>{this.listItems}</ul>
                </div>
            </div>
        )
    }
}

Suggestions.propTypes = {
    suggestions: PropTypes.array,
    addTag: PropTypes.func,
    value: PropTypes.string,
    tags: PropTypes.object
}
