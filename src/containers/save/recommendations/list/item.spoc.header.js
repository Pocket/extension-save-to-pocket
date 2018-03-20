import styles from './item.scss'
import React, { Component } from 'react'
import * as Icon from '../../../../components/icons'

class SpocHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className={styles.sponsorHeader}>
                <a href={this.props.sponsorurl} className={styles.sponsorLink}>
                    <img
                        src={this.props.avatar}
                        alt={this.props.sponsor}
                        className={styles.sponsorAvatar}
                    />{' '}
                    {this.props.sponsor}
                </a>
                <div className={styles.sponsorMenu}>
                    <span className={styles.sponsorLabel}>
                        Sponsored{Icon.CarretDown({
                            display: 'inline-block',
                            height: '8px',
                            fill: 'currentColor'
                        })}
                    </span>
                    <ul className={styles.sponsorDropdown}>
                        <li>{Icon.Hide()} Hide This</li>
                        <li>{Icon.About()} About Sponsored Posts</li>
                        <li>{Icon.HideAll()} Hide All Sponsored Posts</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default SpocHeader
