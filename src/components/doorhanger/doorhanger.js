import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'linaria'
import { PocketLogo } from 'components/icons'

const doorhangerStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  font-family: 'proxima-nova', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica,
    sans-serif !important;

  .doorHanger {
    background-color: #ffffff;
    border-radius: 4px;
    border-style: solid;
    border-width: 2px;
    border-color: #ffffff;
    box-sizing: border-box;
    width: 320px;
    position: absolute;
    padding: 8px 10px;
    top: 10px;
    right: 10px;
    transform: translateY(-150%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    transition: all ease-in-out 250ms;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }

  .valid {
    transform: translateY(0);
  }
  .saveBlock {
    color: #1a1a1a;
    font-size: 1.2rem;
  }
`

/**
 * Injected doorhanger to show on save
 * @param   {string} saveStatus  current status of the item operations
 */
export const Doorhanger = ({ saveStatus }) => {
  const saveStatusCopy = {
    idle: false,
    saving: 'Saving...',
    saved: 'Saved',
    archive: 'Archiving...',
    archived: 'Archived',
    remove: 'Removing...',
    removed: 'Removed',
  }

  const valid = saveStatus !== 'idle'

  return (
    <div className={doorhangerStyle}>
      <div className={cx('doorHanger', saveStatus, valid && 'valid')}>
        <PocketLogo />
        <div className="saveBlock">{saveStatusCopy[saveStatus]}</div>
      </div>
    </div>
  )
}

Doorhanger.propTypes = {
  saveStatus: PropTypes.string.isRequired,
}
