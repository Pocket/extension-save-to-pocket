import styles from './toolbar.scss'
import React, { Component } from 'react'
import Dropdown from 'Modules/Dropdown/dropdown'
import Tagging from './tagging/tagging'
import ToolbarError from './toolbar.error'
import { Icon } from 'Elements/Icons/icon'
import { localize } from '../../../Common/_locales/locales'

function getStatus(type, status) {
  if (status === 'saved') return localize('status', `${type}_${status}`)
  return localize('status', status)
}

class Toolbar extends Component {
  remove = () => this.props.remove()
  archive = () => this.props.archive()

  get statusText() {
    const currentTab = this.props.currentTab
    const type = currentTab ? currentTab.type : 'page'
    const status = currentTab ? currentTab.status : 'idle'
    return getStatus(type, status)
  }

  get listItems() {
    return [
      {
        copy: localize('actions', 'archive_page'),
        icon: <Icon name="archive" />,
        method: this.archive
      },
      {
        copy: localize('actions', 'remove_page'),
        icon: <Icon name="remove" />,
        method: this.remove
      },
      {
        copy: localize('actions', 'open_pocket'),
        icon: <Icon name="openpocket" />,
        method: this.props.openPocket,
        divider: true
      },
      {
        copy: localize('actions', 'settings'),
        icon: <Icon name="settings" />,
        method: this.props.openOptions
      }
    ]
  }

  render() {
    const currentTab = this.props.currentTab
    const status = currentTab ? currentTab.status : 'idle'
    const dropDownActive = this.props.currentTab
      ? currentTab.dropDownActive
      : false

    return (
      <div className={styles.toolbar}>
        <Icon name="pocketlogo" />
        <span className={styles.statusText}>{this.statusText}</span>

        {status === 'error' && <ToolbarError />}

        {status !== 'removed' &&
          status !== 'error' && (
            <Dropdown
              tabId={this.props.tabId}
              active={dropDownActive}
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
            tabId={this.props.tabId}
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
