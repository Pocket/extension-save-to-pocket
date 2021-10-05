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
      d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"
      clipRule="evenodd"
    />
    <path d="M13.5 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM13.736 7.982l-.604 4.527a1.142 1.142 0 01-2.264 0l-.604-4.527a1.751 1.751 0 113.472 0z" />
    {children}
  </svg>
)
