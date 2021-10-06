import React from 'react'
import { css, cx } from 'linaria'
import { localize } from 'common/_locales/locales'
import { PocketLogoIcon } from 'components/icons/icons'
import { SpinnerIcon } from 'components/icons/icons'
import { ErrorIcon } from 'components/icons/icons'
import { Button } from 'components/button/button'

const headingStyle = css`
  display: flex;
  justify-content: space-between;
  background-color: #E8F7F6;
  border-radius: 30px;
  padding: 15px 20px;

  .icon {
    height: 25px;
    width: 25px;
    margin-right: 14px;
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
      color: var(--color-actionPrimaryHover)
    }
  }

  &.error {
    background-color: #FDF2F5;

    .saveBlock {
      color: #EF4056;
    }
  }
`

export const Heading = ({ saveStatus, removeAction }) => {
  const loadingStatus = ['saving', 'removing', 'tags_saving']
  const isLoading = loadingStatus.includes(saveStatus)

  const errorStatus = ['save_failed', 'remove_failed', 'tags_failed', 'tags_error']
  const hasError = errorStatus.includes(saveStatus)

  return (
    <header className={cx(headingStyle, hasError && 'error')}>
      <div>
        { isLoading ? <SpinnerIcon /> : null }
        { hasError ? <ErrorIcon /> : null }
        { !isLoading && !hasError ? <PocketLogoIcon /> : null }
        <div className="saveBlock">{localize('heading', saveStatus)}</div>
      </div>
      {!hasError ? (
        <Button type="inline" onClick={removeAction}>{localize('buttons', 'remove')}</Button>
      ) : null}
    </header>
  )
}
