import React from 'react'
import { css, cx } from 'linaria'

const footerWrapper = css`
  border-top: 1px solid black;
`

export const Footer = ({ settingsClick }) => {
  return (
    <footer className={footerWrapper}>
      <button>My List</button>
      <button onClick={settingsClick}>Settings</button>
    </footer>
  )
}
