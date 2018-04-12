import styles from './chips.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class Chips extends Component {
  removeTag(tag) {
    this.props.removeTag(tag)
  }

  render() {
    const listItems = this.props.tags.map((chip, index) => {
      const marked = this.props.marked.includes(chip)

      const itemClass = cx({
        chip: true,
        active: marked
      })

      return (
        <li
          key={index}
          onMouseDown={event => event.preventDefault()}
          onClick={() => this.props.toggleActive(chip, marked)}
          className={itemClass}>
          {chip}
          {marked && (
            <span onClick={this.removeTag.bind(this, chip)}>&times;</span>
          )}
        </li>
      )
    })

    return <ul className={styles.chipsList}>{listItems}</ul>
  }
}

Chips.propTypes = {
  tags: PropTypes.array,
  marked: PropTypes.array,
  toggleActive: PropTypes.func
}
