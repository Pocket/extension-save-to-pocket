import React, { Component } from 'react'
import { OverflowItem } from './overflowItem'
import { openUrl, openOptions } from 'Common/interface'
import styled from 'react-emotion'

const OverflowList = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const openPocket = () => openUrl('https://getpocket.com')
const openSettings = () => openOptions()

export class OverflowMenu extends Component {
  render() {
    return (
      <OverflowList>
        <OverflowItem name="archive_page" method={this.props.archiveItem} />
        <OverflowItem name="remove_page" method={this.props.removeItem} />
        <OverflowItem name="open_pocket" method={openPocket} divider />
        <OverflowItem name="settings" method={openSettings} />
      </OverflowList>
    )
  }
}
