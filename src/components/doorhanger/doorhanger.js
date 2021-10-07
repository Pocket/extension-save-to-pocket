import React from 'react'
import { css, cx } from 'linaria'

const doorhangerStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  font-family: var(--fontSansSerif);

  .doorHanger {
    background-color: var(--color-canvas);
    border-radius: 4px;
    box-sizing: border-box;
    width: 393px;
    position: absolute;
    padding: 10px;
    top: 10px;
    right: 10px;
    transform: translateY(-150%);
    transition: all ease-in-out 250ms;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.25);

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
