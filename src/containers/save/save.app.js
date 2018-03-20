import React, { Component } from 'react'
import SaveContainer from './save.container'

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

    closePanel = timeout => {
        this.props.closeSavePanel({ tabId: this.props.tab_id, timeout })
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
        return this.props.saves[this.props.active]
    }

    get currentRecs() {
        return this.props.recommendations[this.props.active]
    }

    get currentTags() {
        return this.props.tags[this.props.active]
    }

    render() {
        return (
            <div>
                <SaveContainer
                    isSaveActive={this.isSaveActive()}
                    showRecs={this.showRecs}
                    onHover={this.onHover}
                    offHover={this.offHover}
                    tab_id={this.props.tab_id}
                    currentTab={this.currentTab}
                    setDropDownStatus={this.props.setDropDownStatus}
                    openPocket={this.props.openPocket}
                    openOptions={this.props.openOptions}
                    archiveItem={this.props.archiveItem}
                    removeItem={this.props.removeItem}
                    active={this.props.active}
                    currentTags={this.currentTags}
                    activateTag={this.props.activateTag}
                    deactivateTag={this.props.deactivateTag}
                    deactivateTags={this.props.deactivateTags}
                    addTag={this.props.addTag}
                    closePanel={this.closePanel}
                    removeTag={this.props.removeTag}
                    removeTags={this.props.removeTags}
                    setup={this.props.setup}
                    inputFocused={this.state.inputFocused}
                    setInputFocusState={this.setInputFocusState}
                    currentRecs={this.currentRecs}
                    saveRecommendation={this.props.saveRecommendation}
                    openRecommendation={this.props.openRecommendation}
                    spocImpression={this.props.spocImpression}
                    spocView={this.props.spocView}
                    spocClick={this.props.spocClick}
                />
            </div>
        )
    }
}

export default App
