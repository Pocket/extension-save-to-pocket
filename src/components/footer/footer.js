import React from 'react'
import { css, cx } from 'linaria'
import { SettingsIcon } from 'components/icons/icons'
import { ListViewIcon } from 'components/icons/icons'
import { Button } from 'components/button/extensions-button'

const footerWrapper = css`
  &.footer {
    background-color: var(--color-canvas);
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--color-dividerTertiary);
    margin: 10px 0 0 0;
    padding: 18px 0 8px;
  }

  .icon {
    display: inline-block;
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
    <footer className={cx('footer', footerWrapper)}>
      <Button type="inline" className="buttonLink" onClick={myListClick}>
        <ListViewIcon />
        {chrome.i18n.getMessage('buttons_mylist')}
      </Button>
      <Button type="inline" className="buttonLink" onClick={settingsClick}>
        <SettingsIcon />
      </Button>
    </footer>
  )
}
