import React from 'react'

export default ({ children, ...rest }) => (
  <svg
    {...rest}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M5 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM5 19a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path
      fillRule="evenodd"
      d="M7 5a1 1 0 011-1h13a1 1 0 110 2H8a1 1 0 01-1-1zM7 12a1 1 0 011-1h13a1 1 0 110 2H8a1 1 0 01-1-1zM7 19a1 1 0 011-1h13a1 1 0 110 2H8a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
    {children}
  </svg>
)
