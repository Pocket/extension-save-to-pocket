import React, { Component } from 'react'
import Dropdown from 'components/dropdown/dropdown'
import Tagging from './tagging/tagging'
import ToolbarError from './toolbar.error'
import * as Icon from 'components/icons'
import { localize } from 'common/_locales/locales'
import styled from '@emotion/styled'
import { COLORS, UTILIZATION } from 'common/styles/colors'
import { TYPOGRAPHY } from 'common/styles/variables'
const { $night, $powder, $white, $pitch } = COLORS
const { $panelShadow } = UTILIZATION
const { $fontstackDefault } = TYPOGRAPHY

const ToolbarWrapper = styled.div`
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  background-color: ${props => (props.darkMode ? $night : $powder)};
  border-color: ${props => (props.darkMode ? $pitch : $white)};
  box-shadow: ${$panelShadow};
  color: ${$pitch};
  font-family: ${$fontstackDefault};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 10px;
  position: relative;
  text-align: left;
  z-index: 100;
`
const ToolbarStatus = styled.span`
  display: inline-block;
  font-weight: 600;
  padding: 3px 0;
`

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
    const currentTab = this.props.currentTab
    const status = currentTab ? currentTab.status : 'idle'
    const dropDownActive = this.props.currentTab
      ? currentTab.dropDownActive
      : false

    return (
      <ToolbarWrapper>
        {Icon.PocketLogo({
          width: '22px',
          height: '22px',
          marginRight: '8px'
        })}
        <ToolbarStatus>{this.statusText}</ToolbarStatus>

        {status === 'error' && <ToolbarError />}

        {status !== 'removed' && status !== 'error' && (
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
      </ToolbarWrapper>
    )
  }
}

export default Toolbar
