import React from 'react'
import { css } from 'linaria'
import { SettingsIcon } from 'components/icons/icons'

const footerWrapper = css`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #D9D9D9;
  margin-top: 24px;
  padding: 18px 0 8px;

  .icon {
    height: 25px;
    width: 25px;
    display: inline-block;
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
`

export const Footer = ({ myListClick, settingsClick }) => {
  return (
    <footer className={footerWrapper}>
      <button onClick={myListClick}> My List</button>
      <button onClick={settingsClick}>
        <SettingsIcon />
      </button>
    </footer>
  )
}
