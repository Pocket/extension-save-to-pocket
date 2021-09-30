import React from 'react'
import { css, cx } from 'linaria'
import { PocketLogo } from 'components/icons'

const headingStyle = css`
  .saveBlock {
    color: #1a1a1a;
    font-size: 24px;
  }
`

export const Heading = ({ saveStatus }) => {
  const saveStatusCopy = {
    idle: false,
    saving: 'Saving...',
    saved: 'Saved to Pocket',
    remove: 'Removing...',
    removed: 'Removed',
    tags_saving: 'Saving tags...'
  }

  return (
    <header className={headingStyle}>
      <PocketLogo />
      <div className="saveBlock">{saveStatusCopy[saveStatus]}</div>
    </header>
  )
}
