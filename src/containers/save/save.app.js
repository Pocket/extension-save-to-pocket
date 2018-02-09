import styles from './save.scss' // Import Styles
import React, { Component } from 'react'

import Toolbar from './toolbar/toolbar.main'
import Recommendations from './recommendations/recommendations.main'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const activeState = [
    'saved',
    'saving',
    'removing',
    'removed',
    'archiving',
    'archived',
    'error'
]

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputFocused: false
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const isActive = nextProps.tab_id === nextProps.active
        const currentTab = nextProps.tabs
            ? nextProps.tabs[nextProps.active]
            : false
        const isValid = currentTab
            ? activeState.indexOf(currentTab.status) >= 0
            : false
        const isLoaded = currentTab ? currentTab.frame === 'loaded' : false
        if (
            isActive &&
            currentTab &&
            isValid &&
            isLoaded &&
            !currentTab.shown
        ) {
            this.props.setTabStatus(nextProps.tab_id, currentTab.status, true)
        }
    }

    onHover = () => this.cancelClose()

    offHover = () => {
        if (this.state.inputFocused) return
        this.closePanel()
    }

    closePanel = () => {
        this.props.closeSavePanel({ tabId: this.props.tab_id })
    }

    cancelClose = () => {
        if (this.state.inputFocused) return
        this.props.cancelCloseSavePanel()
    }

    isSaveActive() {
        const isActive = this.tabIsActive && this.statusIsValid
        return isActive
    }

    setInputFocusState = bool => {
        this.setState({ inputFocused: bool })
    }

    get tabIsActive() {
        return this.props.tab_id === this.props.active
    }

    get statusIsValid() {
        return this.props.tabs && this.currentTab
            ? activeState.indexOf(this.currentTab.status) >= 0
            : false
    }

    get showRecs() {
        return (
            this.currentTab &&
            this.currentTab.status === 'saved' &&
            this.props.setup.on_save_recommendations
        )
    }

    get frameLoaded() {
        return this.currentTab && this.currentTab.frame === 'loaded'
    }

    get currentTab() {
        return this.props.tabs[this.props.active]
    }

    get currentSave() {
        return this.props.saves[this.currentTab.hash]
    }

    get currentRecs() {
        return this.props.recommendations[this.currentTab.hash]
    }

    get currentTags() {
        return this.props.tags[this.currentTab.hash]
    }

    render() {
        const panelClass = cx({
            hanger: true,
            active: this.isSaveActive()
        })

        return (
            <div
                className={panelClass}
                onMouseEnter={this.onHover}
                onMouseLeave={this.offHover}>
                {this.isSaveActive() && (
                    <Toolbar
                        tabId={this.props.tab_id}
                        dropDownActive={this.currentTab.dropDownActive}
                        setDropDownStatus={this.props.setDropDownStatus}
                        openPocket={this.props.openPocket}
                        openOptions={this.props.openOptions}
                        archive={this.props.archiveItem}
                        remove={this.props.removeItem}
                        activeTab={this.currentTab}
                        type={this.currentTab.type}
                        status={this.currentTab.status}
                        active={this.props.active}
                        tags={this.currentTags}
                        activateTag={this.props.activateTag}
                        deactivateTag={this.props.deactivateTag}
                        deactivateTags={this.props.deactivateTags}
                        addTag={this.props.addTag}
                        closePanel={this.closePanel}
                        removeTag={this.props.removeTag}
                        removeTags={this.props.removeTags}
                        storedTags={this.props.setup.tags_stored}
                        inputFocused={this.state.inputFocused}
                        setInputFocusState={this.setInputFocusState}
                    />
                )}
                {this.showRecs && (
                    <Recommendations
                        hash={this.currentTab.hash}
                        recs={this.currentRecs}
                        saveRecommendation={this.props.saveRecommendation}
                    />
                )}
            </div>
        )
    }
}

export default App
