import React from 'react'
import { css, cx } from 'linaria'

const doorhangerStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
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
    width: 393px;
    position: absolute;
    padding: 8px 10px;
    top: 10px;
    right: 10px;
    transform: translateY(-150%);
    transition: all ease-in-out 250ms;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);

    &.open {
      transform: translateY(0);
    }
  }
`

export const Doorhanger = ({ isOpen, children }) => {
  return (
    <div className={doorhangerStyle}>
      <div className={cx('doorHanger', isOpen && 'open')}>
        { children }
      </div>
    </div>
  )
}
