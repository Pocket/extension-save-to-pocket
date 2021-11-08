import React from 'react'
import { css, cx } from 'linaria'
import { PocketLogoIcon } from 'components/icons/icons'
import { Loading } from 'components/loading/loading'
import { ErrorIcon } from 'components/icons/icons'
import { Button } from 'components/button/extensions-button'

const headingStyle = css`
  .pocket-extension &.header {
    display: flex;
    justify-content: space-between;
    background-color: var(--color-headingBackground);
    border-radius: 30px;
    padding: 15px 20px 15px 10px;
    font-size: 16px;
  }

  .save-status {
    display: flex;
  }

  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    min-height: 25px;
    margin-right: 15px;
  }

  .icon {
    height: 25px;
    width: 25px;
    margin-top: 0;

    svg {
      height: 25px;
      width: 25px;
    }
  }

  .saveBlock {
    display: inline-flex;
    align-items: center;
    color: var(--color-textPrimary);
    font-family: var(--fontSansSerif);
    font-size: 16px;
    font-weight: 600;
  }

  button.inline {
    text-decoration: none;
    color: var(--color-inlineButton);
    &:hover {
      text-decoration: underline;
    }
  }

  &.error {
    background-color: var(--color-headingErrorBackground);

    .saveBlock, .icon {
      color: var(--color-headingIcon);
    }
  }
`

export const Heading = ({ saveStatus, removeAction, saveAction }) => {
  const loadingStatus = ['saving', 'removing', 'tags_saving']
  const isLoading = loadingStatus.includes(saveStatus)

  const errorStatus = ['save_failed', 'remove_failed', 'tags_failed', 'tags_error']
  const hasError = errorStatus.includes(saveStatus)

  return (
    <header className={cx('header', headingStyle, hasError && 'error')}>
      <div className="save-status">
        <div className="icon-wrapper">
          { isLoading ? <Loading /> : null }
          { hasError ? <ErrorIcon /> : null }
          { !isLoading && !hasError ? <PocketLogoIcon /> : null }
        </div>
        <div className="saveBlock">{chrome.i18n.getMessage(`heading_${saveStatus}`)}</div>
      </div>
      {!hasError && saveStatus !== 'removed' ? (
        <Button type="inline" onClick={removeAction}>{chrome.i18n.getMessage('buttons_remove')}</Button>
      ) : null}
      {saveStatus === 'removed' ? (
        <Button type="inline" onClick={saveAction}>{chrome.i18n.getMessage('buttons_save')}</Button>
      ) : null}
    </header>
  )
}
