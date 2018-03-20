import styles from './item.scss'
import React, { Component } from 'react'
import * as Icon from '../../../../components/icons'

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

    removeSpoc = () => {}

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
                                <button>
                                    {Icon.Hide({
                                        width: '18px',
                                        height: '18px'
                                    })}{' '}
                                    Hide This
                                </button>
                            </li>
                            <li>
                                <button>
                                    {Icon.About({
                                        width: '18px',
                                        height: '18px'
                                    })}{' '}
                                    About Sponsored Posts
                                </button>
                            </li>
                            <li>
                                <button>
                                    {Icon.HideAll({
                                        width: '18px',
                                        height: '18px'
                                    })}{' '}
                                    Hide All Sponsored Posts
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

export default SpocHeader
