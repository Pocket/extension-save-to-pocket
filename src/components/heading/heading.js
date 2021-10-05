import React from 'react'
import { css, cx } from 'linaria'
import { localize } from 'common/_locales/locales'
import { PocketLogoIcon } from 'components/icons/icons'

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
    color: #1a1a1a;
    font-size: 16px;
    font-weight: 600;
  }

  button {
    display: inline-block;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    color: #1A1A1A;
    padding: 0;

    &:hover {
      text-decoration: underline;
      background: transparent;
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
        <PocketLogoIcon />
        <div className="saveBlock">{localize('heading', saveStatus)}</div>
      </div>
      {!hasError ? (
        <button onClick={removeAction}>{localize('buttons', 'remove')}</button>
      ) : null}
    </header>
  )
}
