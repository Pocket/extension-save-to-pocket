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
            <div>
                <a href={this.props.sponsorURL}>
                    <img
                        src={this.props.sponsorAvatar}
                        alt={this.props.sponsorName}
                    />
                </a>
                <div className={styles.sponsorMenu}>
                    Sponsored {Icon.CarretDown()}
                    <ul>
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
