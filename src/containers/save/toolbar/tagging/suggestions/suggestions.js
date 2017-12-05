import styles from './suggestions.scss'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class Suggestions extends Component {

    prevent = event => {
        event.preventDefault()
    }

    get listItems(){
        return this.props.suggestions
            .filter( item => !this.props.tags.includes(item) )
            .map( (suggestion, index) => {
                return (
                    <li key={index}
                        onMouseDown = {event => this.prevent(event) }
                        onClick={ () => this.props.addTag(suggestion) }
                        className={styles.suggestion}>
                        {suggestion}
                    </li>
                )
            })

    }

    get typeahead(){
        return this.props.typeAhead()
            .map( (item, index) => {

                const suggestion = item.suggestion
                const typeAheadClass = cx({
                    typeahead: true,
                    active: item.active
                })

                return (
                    <li key={'ta'+index}
                        onMouseDown = {event => this.prevent(event) }
                        onClick={ () => this.props.addTag(suggestion)}
                        className={typeAheadClass}>
                        {suggestion}
                    </li>
                )
            })
    }

    render() {

        return (
            <div className={styles.suggestions}>

                { this.props.value.length < 1 &&
                    <div>
                        {/*<div className={styles.header}>Suggested Tags</div>*/}
                        <ul className={styles.suggestionsList}>{this.listItems}</ul>
                    </div>
                }
                { this.props.value.length > 0 &&
                    <ul className={styles.typeaheadList}>{this.typeahead}</ul>
                }
            </div>
        )
    }
}

Suggestions.propTypes = {
    suggestions : PropTypes.array,
    typeAhead: PropTypes.func,
    addTag: PropTypes.func,
    value: PropTypes.string,
    tags: PropTypes.array
}
