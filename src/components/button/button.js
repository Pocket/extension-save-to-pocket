import React from 'react'
import { css, cx } from 'linaria'

const buttonStyles = css`
  display: inline-block;
  position: relative;
  font-family: var(--fontSansSerif);
  font-size: 16px;
  line-height: 110%;
  border: none;
  border-radius: 0.25rem;
  padding: 8px 12px;
  transition: all 0.15s ease-out;
  text-decoration: none;
  cursor: pointer;

  &.disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
  }

  &:focus {
    outline: none;

    &::before {
      content: '';
      position: absolute;
      border: 2px solid var(--color-actionFocus);
      top: -4px;
      bottom: -4px;
      left: -4px;
      right: -4px;
      border-radius: 0.5rem;
    }
  }

  &:hover {
    text-decoration: none;

    &::before {
      display: none;
    }
  }

  &:active {
    &::before {
      display: none;
    }
  }

  &.primary {
    background-color: var(--color-actionPrimary);
    border: 2px solid var(--color-actionPrimary);
    color: var(--color-actionPrimaryText);

    &:hover {
      background-color: var(--color-actionPrimaryHover);
      border-color: var(--color-actionPrimaryHover);
    }
  }

  &.secondary {
    background: none;
    border: 2px solid var(--color-actionSecondary);
    color: var(--color-actionSecondaryText);

    &:focus {
      &::before {
        /* offsets adjusted for space taken by outline */
        top: -6px;
        bottom: -6px;
        left: -6px;
        right: -6px;
      }
    }
    &:hover {
      background-color: var(--color-actionSecondaryHover);
      color: var(--color-actionSecondaryHoverText);
    }
  }

  &.inline {
    display: inline;
    background: none;
    padding: 0;
    color: var(--color-inlineButton);
    font-size: 14px;

    &:focus {
      outline: inherit;

      &::before {
        display: none;
      }
    }

    &:hover {
      color: var(--color-inlineButtonHover);
    }
  }
`

export const Button = ({children, onClick, type = 'primary'}) => {
  return (
    <button className={cx(buttonStyles, type)} onClick={onClick}>
      {children}
    </button>
  )
}