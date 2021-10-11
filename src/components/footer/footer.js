import React from 'react'
import { css } from 'linaria'
import { localize } from 'common/_locales/locales'
import { SettingsIcon } from 'components/icons/icons'
import { ListViewIcon } from 'components/icons/icons'
import { Button } from 'components/button/extensions-button'

const footerWrapper = css`
  background-color: var(--color-canvas);
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--color-dividerTertiary);
  margin-top: 10px;
  padding: 18px 0 8px;

  .icon {
    height: 25px;
    width: 25px;
    margin-right: 8px;
  }

  .buttonLink {
    color: var(--color-textPrimary);
    
    &:hover {
      color: var(--color-actionPrimary);
    }
  }
`

export const Footer = ({ myListClick, settingsClick }) => {
  return (
    <footer className={footerWrapper}>
      <Button type="inline" className="buttonLink" onClick={myListClick}>
        <ListViewIcon />
        {localize('buttons', 'mylist')}
      </Button>
      <Button type="inline" className="buttonLink" onClick={settingsClick}>
        <SettingsIcon />
      </Button>
    </footer>
  )
}
