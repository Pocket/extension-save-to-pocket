import React from 'react'
import { css } from 'linaria'
import { localize } from 'common/_locales/locales'
import { SettingsIcon } from 'components/icons/icons'
import { Button } from 'components/button/button'

const footerWrapper = css`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--color-dividerTertiary);
  margin-top: 24px;
  padding: 18px 0 8px;

  .icon {
    height: 25px;
    width: 25px;
    margin-right: 8px;
  }
`

export const Footer = ({ myListClick, settingsClick }) => {
  return (
    <footer className={footerWrapper}>
      <Button type="secondary" onClick={myListClick}>{localize('buttons', 'mylist')}</Button>
      <Button type="inline" onClick={settingsClick}>
        <SettingsIcon />
      </Button>
    </footer>
  )
}
