import styles from './item.scss'
import React, { Component } from 'react'
import SpocMenu from './spoc.menu.js'

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

        <SpocMenu {...this.props} />
      </div>
    )
  }
}

export default SpocHeader
