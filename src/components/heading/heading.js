import React from 'react'
import { css, cx } from 'linaria'
import { PocketLogo } from 'components/icons'

const headingStyle = css`
  .saveBlock {
    color: #1a1a1a;
    font-size: 24px;
  }
`

export const Heading = ({ saveStatus, removeAction }) => {
  const saveStatusCopy = {
    idle: false,
    saving: 'Saving...',
    saved: 'Saved to Pocket',
    save_failed: 'Something went wrong!',
    removing: 'Removing...',
    removed: 'Removed',
    remove_failed: 'Something went wrong!',
    tags_saving: 'Saving tags...',
    tags_saved: 'Tags saved',
    tags_failed: 'Something went wrong!',
    tags_error: 'Tags limited to 25 characters'
  }

  return (
    <header className={headingStyle}>
      <div>
        <PocketLogo />
        <div className="saveBlock">{saveStatusCopy[saveStatus]}</div>
      </div>
      <button onClick={removeAction}>Remove</button>
    </header>
  )
}
