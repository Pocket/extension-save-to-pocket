import styles from './dropdown.scss'
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import dropdownItem from './dropdownItem'
import * as Icon from '../icons'
const cx = classNames.bind(styles)

export default class Dropdown extends Component {
  onHover = () => {
    clearTimeout(this.hoverTimer)
    if (this.props.active) return

    this.props.setStatus(this.props.tabId, true)
  }

  offHover = () => {
    this.hoverTimer = setTimeout(() => {
      this.props.setStatus(this.props.tabId, false)
    }, 250)
  }

  render() {
    const overflowClass = cx({
      overflowList: true,
      active: this.props.active
    })

    return (
      <div className={styles.actions}>
        <button
          className={styles.overflowButton}
          onMouseOver={this.onHover}
          onMouseOut={this.offHover}>
          {Icon.Overflow()}
        </button>
        {this.props.active && (
          <ul
            className={overflowClass}
            onMouseOver={this.onHover}
            onMouseOut={this.offHover}>
            {this.props.list.map(dropdownItem)}
          </ul>
        )}
      </div>
    )
  }
}
