import React from 'react'
import { SectionBlock } from './options'
import { SET_SHORTCUTS } from 'Common/constants'
import { ButtonLink } from 'Elements/Buttons/button'
import { openTabWithUrl } from 'Common/interface'
import { localize } from 'Common/_locales/locales'

export class ShortcutBlock extends React.Component {
  setShortcuts = () => openTabWithUrl(SET_SHORTCUTS)

  render() {
    return (
      <SectionBlock>
        <div className="sectionTitle">
          {localize('options_page', 'keyboard_shortcut_title')}
        </div>
        <div className="sectionBody">
          <ButtonLink onClick={this.setShortcuts}>
            {localize('options_page', 'record_shortcut')}
          </ButtonLink>
        </div>
      </SectionBlock>
    )
  }
}
