import styles from './toolbar.scss'
import React, { Component } from 'react'
import Dropdown from '../../../components/dropdown/dropdown'
import Tagging from './tagging/tagging'
import ToolbarError from './toolbar.error'
import * as Icon from '../../../components/icons'
import { localize } from '../../../common/_locales/locales'

function getStatus(type, status) {
    if (status === 'saved') return localize('status', `${type}_${status}`)
    return localize('status', status)
}

class Toolbar extends Component {
    remove = () => this.props.remove()
    archive = () => this.props.archive()

    get statusText() {
        return getStatus(this.props.type, this.props.status)
    }

    get listItems() {
        return [
            {
                copy: localize('actions', 'archive_page'),
                icon: Icon.Archive,
                method: this.archive
            },
            {
                copy: localize('actions', 'remove_page'),
                icon: Icon.Remove,
                method: this.remove
            },
            {
                copy: localize('actions', 'open_pocket'),
                icon: Icon.OpenPocket,
                method: this.props.openPocket,
                divider: true
            },
            {
                copy: localize('actions', 'settings'),
                icon: Icon.Settings,
                method: this.props.openOptions
            }
        ]
    }

    render() {
        const status = this.props.status
        const saveHash = this.props.activeTab.hash

        return (
            <div className={styles.toolbar}>
                {Icon.PocketLogo({
                    width: '22px',
                    height: '22px',
                    marginRight: '8px'
                })}
                <span className={styles.statusText}>{this.statusText}</span>

                {status === 'error' && <ToolbarError />}

                {status !== 'removed' &&
                    status !== 'error' && (
                        <Dropdown
                            tabId={this.props.tabId}
                            active={this.props.dropDownActive}
                            setStatus={this.props.setDropDownStatus}
                            list={this.listItems}
                        />
                    )}

                {(status === 'saved' || status === 'saving') && (
                    <Tagging
                        tags={this.props.tags}
                        activateTag={this.props.activateTag}
                        deactivateTag={this.props.deactivateTag}
                        addTag={this.props.addTag}
                        deactivateTags={this.props.deactivateTags}
                        closePanel={this.props.closePanel}
                        removeTag={this.props.removeTag}
                        removeTags={this.props.removeTags}
                        saveHash={saveHash}
                        storedTags={this.props.storedTags}
                        inputFocused={this.props.inputFocused}
                        setInputFocusState={this.props.setInputFocusState}
                    />
                )}
            </div>
        )
    }
}

export default Toolbar
