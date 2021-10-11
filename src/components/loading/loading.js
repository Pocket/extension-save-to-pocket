import React from 'react'
import { css, cx } from 'linaria'

const loadingWrapper = css`
  display: inline-flex;
  justify-content: center;

  svg {
    display: block;
    width: 6px;
    height: 6px;
    margin: 0 1.5px;
    fill: currentColor;
  }
  .shape {
    display: inline-block;
    animation: float 1.6s infinite cubic-bezier(0.44, 0.15, 0.59, 0.89) both;
  }
  .round {
    svg {
      fill: var(--color-actionBrand);
    }
    animation-delay: -0.84s;
  }
  .point {
    svg {
      transform-origin: 4px 5px;
      width: 8px;
      height: 8px;
      margin-top: -1px;
      fill: var(--color-amber);
      animation: spinPoint 1.6s infinite ease-in-out forwards;
    }
    animation-delay: -0.42s;
  }
  .block {
    svg {
      margin-bottom: 1px;
      animation: spinBlock 1.6s infinite ease-in-out forwards;
      fill: #116a65;
    }
  }

  @keyframes float {
    0%,
    70%,
    100% {
      transform: translateY(0);
    }
    35% {
      transform: translateY(-10px);
    }
  }

  @keyframes spinPoint {
    0% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(120deg);
    }
    100% {
      transform: rotate(120deg);
    }
  }

  @keyframes spinBlock {
    0% {
      transform: rotate(0deg);
    }
    60% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }
`

export const Loading = ({ className }) => {
  return (
    <aside className={cx(loadingWrapper, className)}>
      <div className="shape round">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
          <circle cx="3" cy="3" r="3" />
        </svg>
      </div>
      <div className="shape point">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M24 22H0L12 2z" />
        </svg>
      </div>
      <div className="shape block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
          <path d="M0 0h6v6H0z" />
        </svg>
      </div>
    </aside>
  )
}
