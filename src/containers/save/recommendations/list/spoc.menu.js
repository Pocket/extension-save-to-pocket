import styles from './item.scss'
import React, { Component } from 'react'
import * as Icon from '../../../../components/icons'

class SpocMenu extends Component {
  constructor(props) {
    super(props)
    this.state = { dropActive: false }
  }

  onHover = () => {
    clearTimeout(this.hoverTimer)
    this.setState({ dropActive: true })
  }

  offHover = () => {
    this.hoverTimer = setTimeout(() => {
      this.setState({ dropActive: false })
    }, 250)
  }

  removeSpoc = () => {
    this.props.spocRemove(this.props.tabId, this.props.itemId)
  }

  render() {
    return (
      <div className={styles.sponsorMenu}>
        <span
          className={styles.sponsorLabel}
          onMouseOver={this.onHover}
          onMouseOut={this.offHover}>
          Sponsored{Icon.CarretDown({
            display: 'inline-block',
            verticalAlign: 'inherit',
            height: '8px',
            fill: 'currentColor'
          })}
        </span>
        {this.state.dropActive && (
          <ul
            className={styles.sponsorDropdown}
            onMouseOver={this.onHover}
            onMouseOut={this.offHover}>
            <li>
              <button onClick={this.removeSpoc}>
                {Icon.Hide({
                  width: '18px',
                  height: '18px'
                })}{' '}
                Hide This
              </button>
            </li>
            <li>
              <a
                href="https://help.getpocket.com/customer/portal/articles/2061219"
                rel="noreferrer noopener"
                target="_blank">
                {Icon.About({
                  width: '18px',
                  height: '18px'
                })}{' '}
                About Sponsored Posts
              </a>
            </li>
            <li>
              <a
                href="https://getpocket.com/premium/hide_sponsorship"
                rel="noreferrer noopener"
                target="_blank">
                {Icon.HideAll({
                  width: '18px',
                  height: '18px'
                })}{' '}
                Hide All Sponsored Posts
              </a>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

export default SpocMenu
