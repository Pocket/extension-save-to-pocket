import styles from './tagging.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chips from './chips/chips'
import Suggestions from './suggestions/suggestions'
import Taginput from './taginput/taginput'
import autosizeInput from 'autosize-input'
import { localize } from '../../../../common/_locales/locales'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class Tagging extends Component {
    constructor(props) {
        super(props)
        this.state = {
            placeholder: !this.hasTags(),
            focused: false,
            inputvalue: '',
            activeSuggestion: -1
        }
    }

    componentDidMount() {
        autosizeInput(this.input)
    }

    /* Utilities
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
    hasTags = () => this.props.tags && this.props.tags.used.length

    /* Input Management
    –––––––––––––––––––––––––––––––––––––––––––––––––– */

    setInputValue = inputvalue => this.setState({ inputvalue })
    setFocus = () => {
        this.setState({ placeholder: false, focused: true })
    }
    setBlur = () => {
        const status = this.state.inputvalue.length || this.hasTags()
        this.setState({ placeholder: !status, focused: false })
    }

    resetInput = () => {
        this.input.focus()
        this.input.style.width = '0.3em'
    }

    /* Tag Management
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
    addTag = value => {
        if (value === '') return
        if (this.props.tags.used.indexOf(value) >= 0) return
        this.props.addTag({ value, saveHash: this.props.saveHash })
        this.setState({ placeholder: false, inputvalue: '' })
        this.resetInput()
    }

    /* Active/Inactive Tagging
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
    makeTagActive = tag => {
        return this.props.activateTag({ tag, saveHash: this.props.saveHash })
    }
    makeTagInactive = tag => {
        return this.props.deactivateTag({ tag, saveHash: this.props.saveHash })
    }

    makeTagsInactive = blur => {
        if (!this.props.tags.marked.length)
            return blur ? this.input.blur() : null
        this.props.deactivateTags({ saveHash: this.props.saveHash })
    }

    handleRemoveAction = () => {
        if (this.state.inputvalue.length || !this.hasTags()) return
        if (!this.props.tags.marked.length) return this.makeTagActive()
        this.props.removeTags({ saveHash: this.props.saveHash })
    }

    removeTag = tag => {
        this.props.removeTag({ tag, saveHash: this.props.saveHash })
    }

    toggleActive = (tag, active) => {
        if (active) this.makeTagInactive(tag)
        else this.makeTagActive(tag)
        this.input.focus()
    }

    // onMouseDown = e => {
    //     // MouseDown when input is active causes an
    //     // Unnecessary reset of the placeholder
    //     // Stopping propagation here is not an option
    //     // due to the possibility of not having iFrame focus
    // }

    onMouseUp = e => {
        e.preventDefault()
        this.input.focus()
    }

    // Suggestions
    get typeAheadSuggestions() {
        const inputValue = this.state.inputvalue
        if (!this.props.tags.suggested) return []
        return this.props.tags.suggested
            .filter(item => {
                return inputValue.length ? item.indexOf(inputValue) > -1 : true
            })
            .slice(0, 3)
    }

    typeAhead = () => {
        return this.typeAheadSuggestions.map((item, index) => {
            return {
                suggestion: item,
                active: index === this.state.activeSuggestion
            }
        })
    }

    handleDirection = keycode => {
        const typeAheadLength = this.typeAheadSuggestions.length
        const activeSuggestion = this.state.activeSuggestion

        if (activeSuggestion < 0) return this.setState({ activeSuggestion: 0 })

        // DOWN
        if (keycode === 40) {
            return activeSuggestion === typeAheadLength - 1
                ? this.setState({ activeSuggestion: 0 })
                : this.setState({ activeSuggestion: activeSuggestion + 1 })
        }

        // UP
        if (keycode === 38) {
            return activeSuggestion === 0
                ? this.setState({ activeSuggestion: typeAheadLength - 1 })
                : this.setState({ activeSuggestion: activeSuggestion - 1 })
        }
    }

    /* Render Component
    –––––––––––––––––––––––––––––––––––––––––––––––––– */
    render() {
        let taggingClass = cx({
            well: true,
            active: this.state.focused
        })

        return (
            <div className={styles.tagging}>
                <div className={taggingClass} onMouseUp={this.onMouseUp}>
                    {this.state.placeholder &&
                        !this.hasTags() && (
                            <div className={styles.placeholder}>
                                {localize('tagging', 'add_tags')}
                            </div>
                        )}
                    {!!this.hasTags() && (
                        <Chips
                            tags={this.props.tags.used}
                            marked={this.props.tags.marked}
                            toggleActive={this.toggleActive}
                            removeTag={this.removeTag}
                        />
                    )}

                    <Taginput
                        hasTags={!!this.hasTags()}
                        inputRef={input => (this.input = input)}
                        value={this.state.inputvalue}
                        focused={this.state.focused}
                        setValue={this.setInputValue}
                        setFocus={this.setFocus}
                        setBlur={this.setBlur}
                        closePanel={this.props.closePanel}
                        addTag={this.addTag}
                        handleRemoveAction={this.handleRemoveAction}
                        handleDirection={this.handleDirection}
                        makeTagsInactive={this.makeTagsInactive}
                    />
                </div>

                {this.props.tags &&
                    this.props.tags.suggested && (
                        <Suggestions
                            value={this.state.inputvalue}
                            tags={this.props.tags.used}
                            suggestions={this.props.tags.suggested}
                            addTag={this.addTag}
                            activate={this.activateTag}
                            activateSuggestion={this.activateSuggestion}
                        />
                    )}
            </div>
        )
    }
}

Tagging.propTypes = {
    tags: PropTypes.object,
    activateTag: PropTypes.func,
    deactivateTags: PropTypes.func,
    addTag: PropTypes.func,
    removeTags: PropTypes.func,
    saveHash: PropTypes.string
}
