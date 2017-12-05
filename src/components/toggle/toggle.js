import style from './toggle.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

export default class Toggle extends Component {
    render() {
        const toggleClass = cx({
            toggle: true,
            active: this.props.active,
            darkMode: this.props.darkMode
        })

        return <button className={toggleClass} onClick={this.props.action} />
    }
}

Toggle.propTypes = {
    active: PropTypes.bool,
    action: PropTypes.func
}
