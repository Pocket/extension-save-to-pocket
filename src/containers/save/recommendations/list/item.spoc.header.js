import styles from './item.scss'
import React, { Component } from 'react'
import { Icon } from 'Elements/Icons/icon'

class SpocHeader extends Component {
  constructor(props) {
    super(props)
    this.state = { dropActive: false }
  }

  componentDidMount() {
    this.props.spocImpression({ context: this.props.spocContext })

    this.viewTimer = setTimeout(() => {
      this.props.spocView({ context: this.props.spocContext })
    }, 1001)
  }

  componentWillUnmount() {
    clearTimeout(this.viewTimer)
    clearTimeout(this.hoverTimer)
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
      <div className={styles.sponsorHeader}>
        <a
          href={this.props.sponsorurl}
          className={styles.sponsorLink}
          rel="noopener noreferrer"
          target="_blank">
          <img
            src={this.props.avatar}
            alt={this.props.sponsor}
            className={styles.sponsorAvatar}
          />{' '}
          {this.props.sponsor}
        </a>
        <div className={styles.sponsorMenu}>
          <span
            className={styles.sponsorLabel}
            onMouseOver={this.onHover}
            onMouseOut={this.offHover}>
            Sponsored{Icon.CarretDown({
              display: 'inline-block',
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
                  <Icon name="hide" /> Hide This
                </button>
              </li>
              <li>
                <a
                  href="https://help.getpocket.com/customer/portal/articles/2061219"
                  rel="noreferrer noopener"
                  target="_blank">
                  <Icon name="about" /> About Sponsored Posts
                </a>
              </li>
              <li>
                <a
                  href="https://getpocket.com/premium/hide_sponsorship"
                  rel="noreferrer noopener"
                  target="_blank">
                  <Icon name="hideall" /> Hide All Sponsored Posts
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default SpocHeader
