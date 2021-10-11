import React from 'react'
import { css, cx } from 'linaria'
import { localize } from 'common/_locales/locales'
import { PocketLogoIcon } from 'components/icons/icons'
import { Loading } from 'components/loading/loading'
import { ErrorIcon } from 'components/icons/icons'
import { Button } from 'components/button/button'

const headingStyle = css`
  display: flex;
  justify-content: space-between;
  background-color: var(--color-calloutBackgroundPrimary);
  border-radius: 30px;
  padding: 15px 20px;
  font-size: 16px;

  .icon {
    height: 25px;
    width: 25px;
    margin-right: 14px;
  }

  .pocket-loading {
    margin-right: 10px;
    margin-bottom: 6px;
  }

  .saveBlock {
    display: inline-block;
    color: var(--color-textPrimary);
    font-size: 16px;
    font-weight: 600;
  }

  button.inline {
    text-decoration: none;
    color: var(--color-actionPrimary);
    &:hover {
      text-decoration: underline;
    }
  }

  &.error {
    background-color: var(--color-coralLightest);

    .saveBlock, .icon {
      color: var(--color-coral);
    }
  }

  .pocket-theme-dark & {
    background: var(--color-grey25);

    button.inline {
      color: var(--color-teal100);
    }

    &.error {
      background-color: var(--color-coralDark);

      .saveBlock, .icon {
        color: var(--color-coralLightest);
      }
    }
  }
`

export const Heading = ({ saveStatus, removeAction, saveAction }) => {
  const loadingStatus = ['saving', 'removing', 'tags_saving']
  const isLoading = loadingStatus.includes(saveStatus)

  const errorStatus = ['save_failed', 'remove_failed', 'tags_failed', 'tags_error']
  const hasError = errorStatus.includes(saveStatus)

  return (
    <header className={cx(headingStyle, hasError && 'error')}>
      <div>
        { isLoading ? <Loading className="pocket-loading" /> : null }
        { hasError ? <ErrorIcon /> : null }
        { !isLoading && !hasError ? <PocketLogoIcon /> : null }
        <div className="saveBlock">{localize('heading', saveStatus)}</div>
      </div>
      {!hasError && saveStatus !== 'removed' ? (
        <Button type="inline" onClick={removeAction}>{localize('buttons', 'remove')}</Button>
      ) : null}
      {saveStatus === 'removed' ? (
        <Button type="inline" onClick={saveAction}>{localize('buttons', 'save')}</Button>
      ) : null}
    </header>
  )
}
