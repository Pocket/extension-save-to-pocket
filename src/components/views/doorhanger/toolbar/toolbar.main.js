import React from 'react'
import Dropdown from 'modules/dropdown/dropdown'
import Tagging from 'modules/tagging/tagging'
import { ToolbarError } from './toolbar.error'
import * as Icon from 'elements/icons'
import { localize } from 'common/_locales/locales'
import styled from '@emotion/styled'
import { COLORS, UTILIZATION } from 'elements/colors/colors'
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

const Toolbar = ({
  remove,
  archive,
  currentTab,
  openPocket,
  logOut,
  tabId,
  setDropDownStatus,
  setInputFocusState,
  inputFocused,
  storedTags,
  tags,
  activateTag,
  deactivateTag,
  deactivateTags,
  removeTag,
  removeTags,
  addTag,
  closePanel
}) => {
  const removeAction = () => remove()
  const archiveAction = () => archive()

  const statusText = () => {
    const type = currentTab ? currentTab.type : 'page'
    const status = currentTab ? currentTab.status : 'idle'
    return getStatus(type, status)
  }

  const listItems = [
    {
      copy: localize('actions', 'archive_page'),
      icon: Icon.Archive,
      method: archiveAction
    },
    {
      copy: localize('actions', 'remove_page'),
      icon: Icon.Remove,
      method: removeAction
    },
    {
      copy: localize('actions', 'open_pocket'),
      method: openPocket,
      divider: true
    },
    {
      copy: localize('actions', 'logout'),
      method: logOut
    }
  ]

  const status = currentTab ? currentTab.status : 'idle'
  const dropDownActive = currentTab
    ? currentTab.dropDownActive
    : false

  return (
    <ToolbarWrapper>
      {Icon.PocketLogo({
        width: '22px',
        height: '22px',
        marginRight: '8px'
      })}
      <ToolbarStatus>{statusText()}</ToolbarStatus>

      {status === 'error' && <ToolbarError />}

      {status !== 'removed' && status !== 'error' && (
        <Dropdown
          tabId={tabId}
          active={dropDownActive}
          setStatus={setDropDownStatus}
          list={listItems}
        />
      )}

      {(status === 'saved' || status === 'saving') && (
        <Tagging
          tags={tags}
          activateTag={activateTag}
          deactivateTag={deactivateTag}
          addTag={addTag}
          deactivateTags={deactivateTags}
          closePanel={closePanel}
          removeTag={removeTag}
          removeTags={removeTags}
          tabId={tabId}
          storedTags={storedTags}
          inputFocused={inputFocused}
          setInputFocusState={setInputFocusState}
        />
      )}
    </ToolbarWrapper>
  )
}

export default Toolbar
