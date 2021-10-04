import React from 'react'

export default ({ children, ...rest }) => (
  <svg
    {...rest}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M23 12c0-6.075-4.925-11-11-11S1 5.925 1 12c0 5.49 4.023 10.041 9.281 10.866V15.18H7.488V12h2.793V9.577c0-2.757 1.643-4.28 4.155-4.28 1.204 0 2.462.215 2.462.215v2.707h-1.387c-1.366 0-1.792.848-1.792 1.718V12h3.05l-.487 3.18h-2.563v7.686C18.977 22.041 23 17.49 23 12z"
      clipRule="evenodd"
    />
    {children}
  </svg>
)
